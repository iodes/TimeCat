using System;
using TimeCat.Core.Commons;
using TimeCat.Core.Driver.EventArg;

namespace TimeCat.Core.Driver.Windows
{
    public class WindowsApplicationDriver : IApplicationDriver
    {
        public event EventHandler<StateChangedEventArgs> StateChanged;

        public bool IsRunning { get; }

        public void Dispose() => Stop();

        public void Start()
        {
            throw new NotImplementedException();
        }

        public void Stop()
        {
            throw new NotImplementedException();
        }

        private void RaiseStateChanged(IApplication application, ActionType stateType) =>
            RaiseStateChanged(new StateChangedEventArgs(application, stateType));

        private void RaiseStateChanged(StateChangedEventArgs eArgs)
        {
            StateChanged?.Invoke(this, eArgs);
        }
    }
}
