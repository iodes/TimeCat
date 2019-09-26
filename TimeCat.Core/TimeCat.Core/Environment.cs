using System.IO;
using SystemEnvironment = System.Environment;

namespace TimeCat.Core
{
    static class Environment
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

        static readonly string _storage = Path.Combine(SystemEnvironment.GetFolderPath(SystemEnvironment.SpecialFolder.Personal), ".timecat");

        public static string Database => Path.Combine(Storage, "TimeCat.db");
    }
}
