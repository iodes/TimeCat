using FunctionTest.EventArg;
using FunctionTest.Interop;
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

namespace FunctionTest
{
    public static class IdleManager
    {
        private static uint _lastTick;

        public static event EventHandler<IdleDetectEventArgs> IdleDetected;
        public static event EventHandler<IdleDetectEventArgs> IdleReleased;

        static Stopwatch _sw = new Stopwatch();

        static int IdleMilliseconds { get; set; } = 5000;

        public static void Init()
        {
            Task.Run(() =>
            {
                while (true)
                {
                    uint tick = User32.GetLastInputTick();

                    if (_lastTick != tick) // Input Something
                    {
                        IdleReleased?.Invoke(null, new IdleDetectEventArgs(_sw.ElapsedMilliseconds));
                        _sw.Restart();
                    }
                    else // IDLE State
                    {
                        if (_sw.ElapsedMilliseconds > IdleMilliseconds) // 만약 IDLE 상태가 IdleMilliseconds초 이상 지속될 경우
                            IdleDetected?.Invoke(null, new IdleDetectEventArgs(_sw.ElapsedMilliseconds));
                    }

                    _lastTick = tick;
                    Thread.Sleep(100);
                }
            });
        }
    }
}
