using System.IO;
using SystemEnvironment = System.Environment;

namespace TimeCat.Core
{
    internal static class Environment
    {
        public static string Storage
        {
            get
            {
                if (!Directory.Exists(_storage))
                    Directory.CreateDirectory(_storage);

                return _storage;
            }
        }

#if !DEBUG
        static readonly string _storage = Path.Combine(SystemEnvironment.GetFolderPath(SystemEnvironment.SpecialFolder.ApplicationData), ".timecat");
#else
        private static readonly string _storage = Path.Combine(SystemEnvironment.GetFolderPath(SystemEnvironment.SpecialFolder.ApplicationData), ".timecat_development");
#endif

        public static string Database => Path.Combine(Storage, "TimeCat.db");
    }
}
