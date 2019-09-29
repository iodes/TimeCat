using FunctionTest.Interop;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace FunctionTest
{
    class Program
    {
        static User32.WinEventDelegate dele = new User32.WinEventDelegate(WinEventProc);
        static uint lastInputTick;
        static int TargetMillseconds = 50;

        static void Main(string[] args)
        {
            var manualResetEvent = new ManualResetEvent(false);

            var thread = new Thread(() =>
            {
                IntPtr m_hhook = User32.SetWinEventHook(User32.eventSystemForeground,
                    User32.eventSystemForeground,
                    IntPtr.Zero,
                    dele,
                    0,
                    0,
                    User32.winEventOutOfContext);

                manualResetEvent.WaitOne();
            });

            Task.Run(() =>
            {
                int i = 0;
                while (true)
                {
                    uint tick = User32.GetLastInputTick();

                    bool isMoved = lastInputTick != tick;
                    lastInputTick = tick;

                    if (i == TargetMillseconds)
                        Console.WriteLine("IDLE Detected (Over 5s)");

                    if (isMoved)
                    {
                        if (i >= TargetMillseconds)
                            Console.WriteLine($"IDLE Time : {i * 100}ms");

                        i = 0;
                    }
                    else
                    {
                        i++;
                    }

                    Thread.Sleep(100);
                }
            });

            //thread.SetApartmentState(ApartmentState.STA);
            //thread.Start();

            Console.ReadLine();
            manualResetEvent.Set();
        }

        private static void WinEventProc(IntPtr hWinEventHook, uint eventType, IntPtr hwnd, int idObject, int idChild, uint dwEventThread, uint dwmsEventTime)
        {
            Console.WriteLine(User32.GetActiveWindowTitle());
        }
    }
}
