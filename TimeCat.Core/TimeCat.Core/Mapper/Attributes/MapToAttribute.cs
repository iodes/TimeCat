using System;

namespace TimeCat.Core.Mapper
{
    public sealed class MapToAttribute : MapAttribute
    {
        public MapToAttribute(string name, Type converter = null, bool reverse = false) : base(name, converter, reverse)
        {
        }
    }
}
