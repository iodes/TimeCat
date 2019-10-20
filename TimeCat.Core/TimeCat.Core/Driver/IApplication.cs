namespace TimeCat.Core.Driver
{
    public interface IApplication
    {
        string Name { get; }

        string FullName { get; }

        string Icon { get; }

        string Version { get; }
    }
}
