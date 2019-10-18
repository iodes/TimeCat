using System;
using System.Collections.Generic;
using System.Text;
using FunctionTest.Common;
using FunctionTest.EventArg;

namespace FunctionTest.Driver.Windows
{
    public class WindowsApplicationDriver : IApplicationDriver
    {
        public event EventHandler<StateChangedEventArgs> StateChanged;

        public bool IsRunning { get; }

        public void Dispose() => Stop();

        public void Start()
        {
            
        }

        public void Stop()
        {
            
        }

        private void RaiseStateChanged(IApplication application, StateType stateType) =>
            RaiseStateChanged(new StateChangedEventArgs(application, stateType));

        private void RaiseStateChanged(StateChangedEventArgs eArgs)
        {
            StateChanged?.Invoke(this, eArgs);
        }
    }
}
