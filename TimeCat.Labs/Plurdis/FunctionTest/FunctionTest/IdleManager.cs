using FunctionTest.EventArg;
using FunctionTest.Interop;
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

namespace FunctionTest
{
    public class IdleManager
    {
        uint _lastTick;
        Stopwatch _sw = new Stopwatch();

        public int IdleMilliseconds { get; set; }

        public event EventHandler<IdleDetectEventArgs> IdleDetected;
        public event EventHandler<IdleDetectEventArgs> IdleReleased;

        public IdleManager(int idleMilliseconds = 5000)
        {
            IdleMilliseconds = idleMilliseconds;
        }

        public void Start()
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
