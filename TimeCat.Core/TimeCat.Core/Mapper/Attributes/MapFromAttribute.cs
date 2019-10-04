using System;

namespace TimeCat.Core.Mapper
{
    public sealed class MapFromAttribute : MapAttribute
    {
        public MapFromAttribute(string name, Type converter = null, bool reverse = false) : base(name, converter, reverse)
        {
        }
    }
}
