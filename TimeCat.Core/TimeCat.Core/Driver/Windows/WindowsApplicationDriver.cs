using Serilog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using TimeCat.Core.Commons;
using TimeCat.Core.Driver.EventArg;
using TimeCat.Core.Driver.Windows.Interops;

namespace TimeCat.Core.Driver.Windows
{
    public class WindowsApplicationDriver : IApplicationDriver
    {
        static readonly string[] ignoreClasses = new string[]
        {
            "DummyDWMListenerWindow",
            "EdgeUiInputTopWndClass",
            "ApplicationFrameWindow",
            "Shell_TrayWnd",
            "Shell_SecondaryTrayWnd",
            "WorkerW"
        };

        public bool IsRunning { get; }

        public event EventHandler<StateChangedEventArgs> StateChanged;

        private IntPtr _hInstance;
        private IntPtr _classHandle;
        private IntPtr _windowHandle;
        private User32.WindowProcedure _wndProc;

        private int _shellMessage;

        private readonly Dictionary<string, ActionType> _actionCache = new Dictionary<string, ActionType>();
        private readonly Dictionary<string, Process> _processCache = new Dictionary<string, Process>();

        private Process _foregroundProcess;
        private IntPtr _foregroundHandle;
        private IApplication _foregroundApplication;

        public void Start()
        {
            if (_windowHandle != IntPtr.Zero)
                return;

            CreateWindow();
            RegisterShellHook();

            while (User32.GetMessage(out User32.MSG msg, _windowHandle, 0, 0) != 0)
            {
                User32.TranslateMessage(ref msg);
                User32.DispatchMessage(ref msg);
            }
        }

        public void Stop()
        {
            if (_windowHandle == IntPtr.Zero)
                return;

            DeregisterShellHook();
            DestroyWindow();
        }

        private void CreateWindow()
        {
            _wndProc = WndProc;
            _hInstance = Kernel32.GetModuleHandle(null);

            var wndClassEx = User32.WNDCLASSEX.Create();
            wndClassEx.lpfnWndProc = _wndProc;
            wndClassEx.hInstance = _hInstance;
            wndClassEx.lpszClassName = "TimeCat.NativeWindow";

            var atom = User32.RegisterClassEx(ref wndClassEx);

            if (atom == 0)
                Log.Error("RegisterClassEx failed with error {Win32Error}", Marshal.GetLastWin32Error());

            _classHandle = new IntPtr(atom);
            _windowHandle = User32.CreateWindowEx(0, _classHandle, IntPtr.Zero, 0, 0, 0, 0, 0, new IntPtr(User32.HWND_MESSAGE), IntPtr.Zero, _hInstance, IntPtr.Zero);

            if (_windowHandle == IntPtr.Zero)
                Log.Information($"CreateWindowEx failed with error {Marshal.GetLastWin32Error()}");
        }

        private void DestroyWindow()
        {
            if (_windowHandle != IntPtr.Zero)
            {
                if (!User32.DestroyWindow(_windowHandle))
                    Log.Information("DestroyWindow failed with error {Win32Error}", Marshal.GetLastWin32Error());

                _windowHandle = IntPtr.Zero;
            }

            if (_classHandle != IntPtr.Zero)
            {
                if (!User32.UnregisterClass(_classHandle, _hInstance))
                    Log.Information("UnregisterClass failed with error {Win32Error}", Marshal.GetLastWin32Error());

                _classHandle = IntPtr.Zero;
                _hInstance = IntPtr.Zero;
            }
        }

        private void RegisterShellHook()
        {
            if (_windowHandle == IntPtr.Zero)
                return;

            _shellMessage = User32.RegisterWindowMessage("SHELLHOOK");
            User32.RegisterShellHookWindow(_windowHandle);
        }

        private void DeregisterShellHook()
        {
        }

        private IntPtr WndProc(IntPtr hWnd, uint msg, UIntPtr wParam, IntPtr lParam)
        {
            if (msg == _shellMessage)
                OnShellWndProc(lParam, (User32.ShellEvents)wParam.ToUInt32());

            return User32.DefWindowProcW(hWnd, msg, wParam, lParam);
        }

        private void OnShellWndProc(IntPtr hWnd, User32.ShellEvents shellEvents)
        {
            if (IsSupportShellEvents(shellEvents))
                return;

            int pId = User32.GetWindowThreadProcessId(hWnd);

            if (shellEvents == User32.ShellEvents.HSHELL_RUDEAPPACTIVATED)
            {
                if (_foregroundProcess?.Id == pId)
                {
                    SetActionType(_foregroundProcess, _foregroundHandle, ActionType.Blur);
                    _foregroundProcess = null;
                    _foregroundHandle = IntPtr.Zero;
                    _foregroundApplication = null;
                }
            }

            if (pId <= 0)
                return;

            if (User32.GetAncestor(hWnd, User32.GetAncestorFlags.GetRootOwner) != hWnd || !User32.IsWindowEnabled(hWnd))
                return;

            if (shellEvents == User32.ShellEvents.HSHELL_WINDOWDESTROYED)
            {
                if (!User32.IsWindow(hWnd))
                    return;
            }
            else
            {
                if (!User32.IsWindowVisible(hWnd) || !User32.IsWindow(hWnd))
                    return;
            }

            SetActionType(Process.GetProcessById(pId), hWnd, ShellEventToActionType(shellEvents));
        }

        private void SetActionType(Process process, IntPtr hWnd, ActionType action)
        {
            string fileName = process.MainModule.FileName;

            if (_actionCache.TryGetValue(fileName, out ActionType prevAction))
            {
                if (prevAction == ActionType.Close || prevAction == action)
                    return;
            }
            else if (action != ActionType.Open)
            {
                return;
            }

            switch (action)
            {
                case ActionType.Open:
                    if (_processCache.ContainsKey(fileName))
                        return;
                    else
                        _processCache[fileName] = process;
                    break;

                case ActionType.Focus:
                    _foregroundHandle = hWnd;
                    _foregroundProcess = process;
                    break;

                case ActionType.Close:
                    if (!_processCache.ContainsKey(fileName))
                        return;

                    int count = 0;
                    IntPtr[] ignores = GetIgnoreHandles();

                    User32.EnumWindows(
                        delegate (IntPtr wnd, IntPtr param)
                        {
                            if (User32.GetWindowThreadProcessId(wnd) == process.Id &&
                                User32.IsWindowVisible(wnd) &&
                                Array.IndexOf(ignoreClasses, User32.GetClassName(wnd)) == -1 &&
                                Array.IndexOf(ignores, wnd) == -1)
                            {
                                count++;
                            }

                            return true;
                        },
                        IntPtr.Zero);

                    if (count > 0)
                        return;
                    
                    if (fileName == _foregroundProcess.MainModule.FileName)
                    {
                        OnApplicationEvent(_foregroundProcess, _foregroundHandle, ActionType.Blur);
                    }

                    _processCache.Remove(fileName);
                    break;
            }

            if (action ==  ActionType.Close)
                _actionCache.Remove(fileName);
            else
                _actionCache[fileName] = action;

            OnApplicationEvent(process, hWnd, action);
        }

        private IApplication GetApplication(Process process, IntPtr hWnd)
        {
            return null; // TODO
        }

        private void OnApplicationEvent(Process process, IntPtr hWnd, ActionType actionType)
        {
            string title = User32.GetWindowText(hWnd);
            Log.Information("[{actionType}] {Title} (PID: {pId}) {f}", actionType, title, process.Id, process.MainModule.FileName);

            StateChanged?.Invoke(this, new StateChangedEventArgs(GetApplication(process, hWnd), actionType));
        }

        private bool IsSupportShellEvents(User32.ShellEvents shellEvents)
        {
            return shellEvents != User32.ShellEvents.HSHELL_WINDOWACTIVATED &&
                shellEvents != User32.ShellEvents.HSHELL_WINDOWDESTROYED &&
                shellEvents != User32.ShellEvents.HSHELL_WINDOWCREATED &&
                shellEvents != User32.ShellEvents.HSHELL_RUDEAPPACTIVATED;
        }

        private ActionType ShellEventToActionType(User32.ShellEvents events) => events switch
        {
            User32.ShellEvents.HSHELL_WINDOWCREATED => ActionType.Open,
            User32.ShellEvents.HSHELL_WINDOWDESTROYED => ActionType.Close,
            User32.ShellEvents.HSHELL_RUDEAPPACTIVATED => ActionType.Focus,
            _ => default
        };

        private IntPtr[] GetIgnoreHandles()
        {
            return new[]
            {
                GetDesktopWindow(DesktopWindow.ProgMan),
                GetDesktopWindow(DesktopWindow.SHELLDLL_DefView),
                GetDesktopWindow(DesktopWindow.SHELLDLL_DefViewParent),
                GetDesktopWindow(DesktopWindow.SysListView32)
            };
        }

        public void Dispose()
        {
            Stop();
        }

        public static IntPtr GetDesktopWindow(DesktopWindow desktopWindow)
        {
            IntPtr _ProgMan = User32.GetShellWindow();
            IntPtr _SHELLDLL_DefViewParent = _ProgMan;
            IntPtr _SHELLDLL_DefView = User32.FindWindowEx(_ProgMan, IntPtr.Zero, "SHELLDLL_DefView", null);
            IntPtr _SysListView32 = User32.FindWindowEx(_SHELLDLL_DefView, IntPtr.Zero, "SysListView32", "FolderView");

            if (_SHELLDLL_DefView == IntPtr.Zero)
            {
                User32.EnumWindows((hwnd, lParam) =>
                {
                    if (User32.GetClassName(hwnd) == "WorkerW")
                    {
                        IntPtr child = User32.FindWindowEx(hwnd, IntPtr.Zero, "SHELLDLL_DefView", null);
                        if (child != IntPtr.Zero)
                        {
                            _SHELLDLL_DefViewParent = hwnd;
                            _SHELLDLL_DefView = child;
                            _SysListView32 = User32.FindWindowEx(child, IntPtr.Zero, "SysListView32", "FolderView"); ;
                            return false;
                        }
                    }
                    return true;
                }, IntPtr.Zero);
            }

            switch (desktopWindow)
            {
                case DesktopWindow.ProgMan:
                    return _ProgMan;
                case DesktopWindow.SHELLDLL_DefViewParent:
                    return _SHELLDLL_DefViewParent;
                case DesktopWindow.SHELLDLL_DefView:
                    return _SHELLDLL_DefView;
                case DesktopWindow.SysListView32:
                    return _SysListView32;
                default:
                    return IntPtr.Zero;
            }
        }

        public enum DesktopWindow
        {
            ProgMan,
            SHELLDLL_DefViewParent,
            SHELLDLL_DefView,
            SysListView32
        }
    }
}
