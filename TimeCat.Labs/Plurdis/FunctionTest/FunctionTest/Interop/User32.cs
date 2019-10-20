using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;

namespace FunctionTest.Interop
{
    class User32
    {
        #region API Declaration
        public const uint winEventOutOfContext = 0;
        public const uint eventSystemForeground = 3;

        public delegate void WinEventDelegate(IntPtr hWinEventHook, uint eventType, IntPtr hwnd, int idObject, int idChild, uint dwEventThread, uint dwmsEventTime);

        [DllImport(ExternDll.User32)]
        public static extern IntPtr SetWinEventHook(uint eventMin, uint eventMax, IntPtr hmodWinEventProc, WinEventDelegate lpfnWinEventProc, uint idProcess, uint idThread, uint dwFlags);

        [DllImport(ExternDll.User32)]
        public static extern IntPtr GetForegroundWindow();

        [DllImport(ExternDll.User32)]
        public static extern int GetWindowText(IntPtr hWnd, StringBuilder text, int count);

        public delegate bool EnumWindowsProc(IntPtr hWnd, int lParam);

        [DllImport(ExternDll.User32)]
        public static extern bool EnumWindows(EnumWindowsProc enumFunc, int lParam);

        [DllImport(ExternDll.User32)]
        public static extern IntPtr GetWindowLong(IntPtr hWnd, int nIndex);

        [DllImport(ExternDll.User32)]
        public static extern bool IsWindowVisible(IntPtr hWnd);

        [DllImport(ExternDll.User32)]
        public static extern int GetWindowTextLength(IntPtr hWnd);

        [DllImport(ExternDll.User32)]
        public static extern IntPtr GetShellWindow();

        [DllImport(ExternDll.User32)]
        public static extern bool GetLastInputInfo(ref LASTINPUTINFO plii);

        [DllImport(ExternDll.User32)]
        public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
        #endregion

        #region Function Declaration

        public static int GetWindowThreadProcessId(IntPtr hWnd)
        {
            GetWindowThreadProcessId(hWnd, out uint pid);
            return (int)pid;
        }

        public static uint GetLastInputTick()
        {
            var lastInputInfo = new LASTINPUTINFO();
            lastInputInfo.cbSize = (uint)Marshal.SizeOf(lastInputInfo);
            lastInputInfo.dwTime = 0;

            GetLastInputInfo(ref lastInputInfo);

            return lastInputInfo.dwTime;
        }

        public static string GetWindowTitle(IntPtr hwnd)
        {
            const int nChars = 256;
            var Buff = new StringBuilder(nChars);
            
            if (GetWindowText(hwnd, Buff, nChars) > 0)
            {
                return Buff.ToString();
            }
            return null;
        }

        public static IDictionary<IntPtr, string> GetOpenWindows()
        {
            IntPtr shellWindow = User32.GetShellWindow();
            Dictionary<IntPtr, string> windows = new Dictionary<IntPtr, string>();

            User32.EnumWindows(delegate (IntPtr hWnd, int lParam)
            {
                if (hWnd == shellWindow) return true;
                if (!User32.IsWindowVisible(hWnd)) return true;

                int length = User32.GetWindowTextLength(hWnd);
                if (length == 0) return true;

                StringBuilder builder = new StringBuilder(length);
                User32.GetWindowText(hWnd, builder, length + 1);

                windows[hWnd] = builder.ToString();
                return true;

            }, 0);

            return windows;
        }

        #endregion

        #region Struct Declaration

        internal struct LASTINPUTINFO
        {
            public uint cbSize;
            public uint dwTime;
        }

        #endregion
    }
}
