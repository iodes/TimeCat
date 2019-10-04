using TimeCat.Proto.Commons;

namespace TimeCat.Core.Extensions
{
    public static class NullableInt32Extensions
    {
        public static bool HasValue(this NullableInt32 source)
        {
            return source != null;
        }
    }
}
