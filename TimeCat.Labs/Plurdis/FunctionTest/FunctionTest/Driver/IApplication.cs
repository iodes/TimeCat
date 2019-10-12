using System;
using System.Collections.Generic;
using System.Text;

namespace FunctionTest.Driver
{
    public interface IApplication
    {
        int ProcessId { get; }

        string Caption { get; }
    }
}
