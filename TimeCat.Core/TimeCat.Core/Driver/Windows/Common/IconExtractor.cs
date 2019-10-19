using System;
using System.Drawing;
using System.IO;
using TimeCat.Core.Driver.Windows.Interop;

namespace TimeCat.Core.Driver.Windows.Common
{
    static class IconExtractor
    {
        public static IntPtr GetIconHandle(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
                return IntPtr.Zero;

            Shell32.ExtractIconEx(filePath, 0, out IntPtr largeIcon, out IntPtr smallIcon, 1);

            return largeIcon;
        }

        public static string SaveIcon(string filePath)
        {
            string path = Path.Combine(EnvironmentSupport.Cache, Guid.NewGuid().ToString("N") + ".png");
            IntPtr iconHandle = GetIconHandle(filePath);
            if (iconHandle != IntPtr.Zero)
            {
                Icon.FromHandle(iconHandle).ToBitmap().Save(path);
                CacheDictionary.Set(filePath.ToLower(), path);
                return path;
            }

            return string.Empty;
        }
    }
}
