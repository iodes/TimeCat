using FunctionTest.EventArg;
using System;
using System.Collections.Generic;
using System.Text;

namespace FunctionTest.Driver
{
    interface IApplicationDriver
    {
        event EventHandler<StateChangedEventArgs> StateChanged;
    }
}
