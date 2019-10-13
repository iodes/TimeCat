using System.Linq;
using System.Runtime.InteropServices;

namespace TimeCat.Core.Utility
{
    static class RuntimeInformationUtility
    {
        private static readonly OSPlatform[] _platforms = 
        {
            OSPlatform.Windows, 
            OSPlatform.OSX,
            OSPlatform.FreeBSD, 
            OSPlatform.Linux 
        };

        static RuntimeInformationUtility()
        {
            OSPlatform = _platforms.FirstOrDefault(platform => RuntimeInformation.IsOSPlatform(platform));
        }

        public static OSPlatform OSPlatform { get; private set; }
    }
}
