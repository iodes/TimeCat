namespace TimeCat.Core.Driver
{
    public interface IApplication
    {
        int ProcessId { get; }

        string Name { get; }

        string FullName { get; }

        string Icon { get; }

        string Version { get; }
    }
}
