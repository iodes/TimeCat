using TimeCat.Core.EventArg;
using System;
using System.Collections.Generic;
using System.Text;

namespace TimeCat.Core.Driver
{
    interface IApplicationDriver : IDisposable
    {
        event EventHandler<StateChangedEventArgs> StateChanged;

        void Start();

        void Stop();
    }
}
