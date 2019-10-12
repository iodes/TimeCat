namespace TimeCat.Core.Driver.Windows
{
    public class WindowsApplication : IApplication
    {
        public int ProcessId { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }

        public string Icon { get; set; }

        public string Version { get; set; }
    }
}
