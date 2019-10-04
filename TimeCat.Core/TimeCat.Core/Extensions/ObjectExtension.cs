using TimeCat.Core.Utilities;

namespace TimeCat.Core.Extensions
{
    static class ObjectExtension
    {
        public static TDestination Map<TDestination>(this object from)
        {
            return MappingUtility.Map<TDestination>(from);
        }
    }
}
