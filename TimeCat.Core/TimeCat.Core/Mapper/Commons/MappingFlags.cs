using System;

namespace TimeCat.Core.Mapper
{
    [Flags]
    public enum MappingFlags
    {
        None = 0,
        From = 1,
        To = 2,
        TwoWay = From | To
    }
}
