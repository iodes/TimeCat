using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace FunctionTest.Driver.Windows
{
    public class WindowsApplication : IApplication
    {
        public int ProcessId { get; set; }

        public string Caption { get; set; }
    }
}
