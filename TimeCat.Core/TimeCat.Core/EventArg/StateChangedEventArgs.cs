using System;
using TimeCat.Core.Commons;
using TimeCat.Core.Driver;

namespace TimeCat.Core.EventArg
{
    public class StateChangedEventArgs : EventArgs
    {
        public IApplication Application { get; }

        public ActionType StateType { get; }

        public DateTimeOffset DateTimeOffset { get; }

        public StateChangedEventArgs(IApplication application, ActionType stateType)
        {
            Application = application;
            StateType = stateType;
            DateTimeOffset = DateTimeOffset.UtcNow;
        }
    }
}
