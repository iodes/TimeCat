using System.IO;

namespace TimeCat.Core.Driver.Windows.Common
{
    public static class EnvironmentSupport
    {
        const string cacheDir = "Cache";

        static readonly string _storage = $@"{System.Environment.GetFolderPath(System.Environment.SpecialFolder.ApplicationData)}\TimeCat";

        public static string Cache
        {
            get
            {
                var combine = Path.Combine(Storage, cacheDir);

                if (!Directory.Exists(combine))
                    Directory.CreateDirectory(combine);

                return combine;
            }
        }

        public static string Storage
        {
            get
            {
                if (!Directory.Exists(_storage))
                    Directory.CreateDirectory(_storage);

                return _storage;
            }
        }
    }
}
