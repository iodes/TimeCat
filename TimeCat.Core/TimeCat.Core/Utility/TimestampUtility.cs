using Google.Protobuf.WellKnownTypes;
using System;

namespace TimeCat.Core.Utility
{
    static class TimestampUtility
    {
        public static Timestamp Now => Timestamp.FromDateTimeOffset(DateTimeOffset.UtcNow);
    }
}
