using System;
using System.Collections.Generic;
using System.Text;

namespace FunctionTest.EventArg
{
    public class IdleDetectEventArgs : EventArgs
    {
        public IdleDetectEventArgs(long idleMillseconds)
        {
            IdleMillseconds = idleMillseconds;
        }

        public long IdleMillseconds { get; }
    }
}
