using System;
using TimeCat.Core.Driver.EventArg;

namespace TimeCat.Core.Driver
{
    internal interface IApplicationDriver : IDisposable
    {
        event EventHandler<StateChangedEventArgs> StateChanged;

        void Start();

        void Stop();
    }
}
