using FunctionTest.EventArg;
using System;
using System.Collections.Generic;
using System.Text;

namespace FunctionTest.Driver
{
    interface IApplicationDriver : IDisposable
    {
        event EventHandler<StateChangedEventArgs> StateChanged;

        void Start();

        void Stop();
    }
}
