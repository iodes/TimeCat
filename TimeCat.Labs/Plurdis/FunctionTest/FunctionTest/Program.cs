using FunctionTest.Interop;
using System;
using System.Threading;

namespace FunctionTest
{
    class Program
    {
        static User32.WinEventDelegate dele = new User32.WinEventDelegate(WinEventProc);

        static void Main(string[] args)
        {
            var thread = new Thread(() =>
            {
                IntPtr m_hhook = User32.SetWinEventHook(User32.eventSystemForeground,
                    User32.eventSystemForeground,
                    IntPtr.Zero,
                    dele,
                    0,
                    0,
                    User32.winEventOutOfContext);
            });
            thread.Start();

            while (true)
            {
                Thread.Sleep(10);
            }
        }

        private static void WinEventProc(IntPtr hWinEventHook, uint eventType, IntPtr hwnd, int idObject, int idChild, uint dwEventThread, uint dwmsEventTime)
        {
            Console.WriteLine(User32.GetActiveWindowTitle());
        }
    }
}
