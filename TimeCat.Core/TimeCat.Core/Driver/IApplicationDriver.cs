using System;
using TimeCat.Core.EventArg;

namespace TimeCat.Core.Driver
{
    interface IApplicationDriver : IDisposable
    {
        event EventHandler<StateChangedEventArgs> StateChanged;

        void Start();

        void Stop();
    }
}
