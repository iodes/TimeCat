using System;
using System.Runtime.InteropServices;
using TimeCat.Core.Interop;

namespace TimeCat.Core.Driver.Windows.Interop
{
    static class Shell32
    {
        [DllImport(ExternDll.Shell32)]
        public static extern IntPtr ExtractIconEx(string sFile, int iIndex, out IntPtr piLargeVersion, out IntPtr piSmallVersion, int amountIcons);
    }
}
