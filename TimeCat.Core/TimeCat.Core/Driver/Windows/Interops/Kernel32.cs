using System;
using System.Runtime.InteropServices;

namespace TimeCat.Core.Driver.Windows.Interops
{
    internal static class Kernel32
    {
        [DllImport(ExternDll.Kernel32, CharSet = CharSet.Auto, SetLastError = true)]
        public static extern IntPtr GetModuleHandle(string lpModuleName);

        [DllImport(ExternDll.Kernel32)]
        public static extern IntPtr GetConsoleWindow();

        [DllImport(ExternDll.Kernel32, SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool GetExitCodeProcess(IntPtr hProcess, out uint lpExitCode);

    }
}
