using FunctionTest.Interop;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace FunctionTest
{
    public static class FocusDetector
    {
        static User32.WinEventDelegate dele = new User32.WinEventDelegate(WinEventProc);

        static string lastTitle;
        static int fullCtr = 0;
        static bool _running = false;

        static ManualResetEvent _manualResetEvent;

        static FocusDetector()
        {
            _manualResetEvent = new ManualResetEvent(false);
        }

        public static void Start()
        {
            if (_running)
                return;

            _running = true;

            Thread thread = new Thread(() =>
            {
                User32.SetWinEventHook(User32.eventSystemForeground,
                    User32.eventSystemForeground,
                    IntPtr.Zero,
                    dele,
                    0,
                    0,
                    User32.winEventOutOfContext);

                _manualResetEvent.WaitOne();
            });

            thread.SetApartmentState(ApartmentState.STA);
            thread.Start();
        }

        public static void Stop()
        {
            if (_running)
            {
                _manualResetEvent.Set();
                _running = false;
            }
        }

        private static void WinEventProc(IntPtr hWinEventHook, uint eventType, IntPtr hwnd, int idObject, int idChild, uint dwEventThread, uint dwmsEventTime)
        {
            fullCtr = 0;
            string title = User32.GetWindowTitle(hwnd);

            Console.WriteLine($"Selected Window Changes to {title} pid {User32.GetWindowThreadProcessId(hwnd)}");

            lastTitle = title;
        }
    }
}
