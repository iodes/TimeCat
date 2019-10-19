using System;
using TimeCat.Core.Driver.EventArg;

namespace TimeCat.Core.Driver.Unix
{
    public class UnixApplicationDriver : IApplicationDriver
    {
        public event EventHandler<StateChangedEventArgs> StateChanged;

        public void Start()
        {
            throw new NotImplementedException();
        }

        public void Stop()
        {
            throw new NotImplementedException();
        }
        
        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}