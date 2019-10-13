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
        static int targetMillseconds = 50;
        static int idleCtr = 0;
        static int fullCtr = 0;
        static string lastTitle;
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
                lastTitle = User32.GetActiveWindowTitle();
                while (true)
                {
                    uint tick = User32.GetLastInputTick();

                    bool isMoved = lastInputTick != tick;
                    lastInputTick = tick;

                    if (idleCtr == targetMillseconds)
                        Console.WriteLine("IDLE Detected (Over 5s)");

                    if (isMoved)
                    {
                        if (idleCtr >= targetMillseconds)
                            Console.WriteLine($"IDLE Time : {idleCtr * 100}ms");

                        idleCtr = 0;
                    }
                    else
                    {
                        idleCtr++;
                    }

                    fullCtr++;

                    Thread.Sleep(100);
                }
            });

            thread.SetApartmentState(ApartmentState.STA);
            thread.Start();

            Console.ReadLine();
            manualResetEvent.Set();
        }
        
        private static void WinEventProc(IntPtr hWinEventHook, uint eventType, IntPtr hwnd, int idObject, int idChild, uint dwEventThread, uint dwmsEventTime)
        {
            Console.WriteLine($"'{lastTitle}' Window was selected while {fullCtr * 100}ms.");
            idleCtr = 0;
            fullCtr = 0;
            string title = User32.GetActiveWindowTitle();
            Console.WriteLine($"Selected Window Changes to {title}");

            lastTitle = title;
        }
    }
}
