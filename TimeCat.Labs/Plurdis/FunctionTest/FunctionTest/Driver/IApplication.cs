using System;
using System.Collections.Generic;
using System.Text;

namespace FunctionTest.Driver
{
    public interface IApplication
    {
        int ProcessId { get; }

        string Name { get; }

        string FullName { get; }

        string Icon { get; }

        string Version { get; }
    }
}
