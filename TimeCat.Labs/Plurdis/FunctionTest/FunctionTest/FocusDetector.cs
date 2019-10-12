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
        static bool isInitalized = false;

        public static void InitalizeHook()
        {
            if (!isInitalized)
            {
                Thread thread = new Thread(() =>
                {
                    User32.SetWinEventHook(User32.eventSystemForeground,
                        User32.eventSystemForeground,
                        IntPtr.Zero,
                        dele,
                        0,
                        0,
                        User32.winEventOutOfContext);
                });
                thread.SetApartmentState(ApartmentState.STA);
                thread.Start();
                
                isInitalized = true;
            }
        }

        private static void WinEventProc(IntPtr hWinEventHook, uint eventType, IntPtr hwnd, int idObject, int idChild, uint dwEventThread, uint dwmsEventTime)
        {
            Console.WriteLine($"'{lastTitle}' Window was selected while {fullCtr * 100}ms.");
            fullCtr = 0;
            string title = User32.GetActiveWindowTitle();
            Console.WriteLine($"Selected Window Changes to {title}");

            lastTitle = title;
        }
    }
}
