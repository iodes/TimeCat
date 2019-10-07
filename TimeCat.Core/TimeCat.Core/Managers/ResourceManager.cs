using System.IO;
using System.Reflection;

namespace TimeCat.Core.Managers
{
    public static class ResourceManager
    {
        static readonly Assembly _assembly;

        static ResourceManager()
        {
            _assembly = Assembly.GetExecutingAssembly();
        }
        
        public static Stream GetStream(string resourceName)
        {
            return _assembly.GetManifestResourceStream($"TimeCat.Core.Resources.{resourceName}");
        }

        public static string GetText(string resourceName)
        {
            using Stream stream = GetStream(resourceName);
            using var reader = new StreamReader(stream);

            return reader.ReadToEnd();
        }
    }
}