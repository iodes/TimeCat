using System;

namespace TimeCat.Core.Mapper
{
    [AttributeUsage(AttributeTargets.Property)]
    public abstract class MapAttribute : Attribute
    {
        public string Name { get; }
        
        public Type Converter { get; }
        
        public bool Reverse { get; }

        public MapAttribute(string name, Type converter, bool reverse)
        {
            Name = name;
            Converter = converter;
            Reverse = reverse;
        }
    }
}
