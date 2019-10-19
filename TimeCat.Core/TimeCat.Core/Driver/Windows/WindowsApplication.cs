using System.Diagnostics;
using System.IO;
using TimeCat.Core.Driver.Windows.Common;

namespace TimeCat.Core.Driver.Windows
{
    public class WindowsApplication : IApplication
    {
        public static WindowsApplication FromPath(string fullPath)
        {
            var versionInfo = FileVersionInfo.GetVersionInfo(fullPath);
            string productName = versionInfo.ProductName;

            return new WindowsApplication()
            {
                FullName = fullPath,
                Icon = CacheDictionary.HasIcon(fullPath) ? CacheDictionary.Get(fullPath) : IconExtractor.SaveIcon(fullPath),
                Name =  productName == null ? Path.GetFileNameWithoutExtension(fullPath) : productName,
                Version = versionInfo.FileVersion
            };
        }

        public string Name { get; set; }

        public string FullName { get; set; }

        public string Icon { get; set; }

        public string Version { get; set; }

        public override string ToString()
        {
            return $"{Name} ({Version})";
        }
    }
}
