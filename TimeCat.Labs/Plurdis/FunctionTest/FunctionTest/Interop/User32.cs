using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace FunctionTest.Interop
{
    class User32
    {
        #region API Declaration

        public delegate bool EnumWindowsProc(IntPtr hWnd, int lParam);

        [DllImport(ExternDll.User32)]
        public static extern bool EnumWindows(EnumWindowsProc enumFunc, int lParam);

        [DllImport(ExternDll.User32)]
        public static extern IntPtr GetWindowLong(IntPtr hWnd, int nIndex);

        [DllImport(ExternDll.User32)]
        public static extern bool IsWindowVisible(IntPtr hWnd);

        [DllImport(ExternDll.User32)]
        public static extern int GetWindowTextLength(IntPtr hWnd);

        [DllImport(ExternDll.User32)]
        public static extern IntPtr GetShellWindow();

        [DllImport(ExternDll.User32)]
        public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

        [DllImport(ExternDll.User32)]
        static extern bool GetLastInputInfo(ref LASTINPUTINFO plii);

        #endregion

        #region Function Declaration

        public static IDictionary<IntPtr, string> GetOpenWindows()
        {
            IntPtr shellWindow = User32.GetShellWindow();
            Dictionary<IntPtr, string> windows = new Dictionary<IntPtr, string>();

            User32.EnumWindows(delegate (IntPtr hWnd, int lParam)
            {
                if (hWnd == shellWindow) return true;
                if (!User32.IsWindowVisible(hWnd)) return true;

                int length = User32.GetWindowTextLength(hWnd);
                if (length == 0) return true;

                StringBuilder builder = new StringBuilder(length);
                User32.GetWindowText(hWnd, builder, length + 1);

                windows[hWnd] = builder.ToString();
                return true;

            }, 0);

            return windows;
        }

        #endregion

        #region Struct Declaration

        internal struct LASTINPUTINFO
        {
            public uint cbSize;
            public uint dwTime;
        }

        #endregion
    }
}
