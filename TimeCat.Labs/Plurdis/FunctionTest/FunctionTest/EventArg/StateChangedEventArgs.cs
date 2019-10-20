using FunctionTest.Common;
using FunctionTest.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace FunctionTest.EventArg
{
    public class StateChangedEventArgs : EventArgs
    {
        public IApplication Application { get; }

        public StateType StateType { get; }

        public DateTimeOffset DateTimeOffset { get; }

        public StateChangedEventArgs(IApplication application, StateType stateType)
        {
            Application = application;
            StateType = stateType;
            DateTimeOffset = DateTimeOffset.UtcNow;
        }
    }
}
