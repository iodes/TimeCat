using System;
using Google.Protobuf.WellKnownTypes;

namespace TimeCat.Core.Utility
{
    internal static class TimestampUtility
    {
        public static Timestamp Now => Timestamp.FromDateTimeOffset(DateTimeOffset.UtcNow);
    }
}
