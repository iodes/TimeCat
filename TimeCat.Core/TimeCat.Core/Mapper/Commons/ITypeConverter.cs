using System;

namespace TimeCat.Core.Mapper
{
    public interface ITypeConverter
    {
        object ConvertFrom(object value);
        
        object ConvertTo(object value);
        
        bool CanConvertFrom(Type type);
        
        bool CanConvertTo(Type type);
    }
}
