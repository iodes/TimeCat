using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace TimeCat.Core.Utility
{
    public static class ProcessUtility
    {
        public static string GetFilePathFromProcessId(int processId)
        {
            var process = Process.GetProcessById(processId);
            return process.MainModule.FileName;
        }
    }
}
