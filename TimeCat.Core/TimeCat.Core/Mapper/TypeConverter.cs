using System;
using System.Collections.Generic;

namespace TimeCat.Core.Mapper
{
    public static class TypeConverter
    {
        private static readonly Dictionary<Type, ITypeConverter> _converters = new Dictionary<Type, ITypeConverter>();

        public static ITypeConverter From(MapAttribute attribute)
        {
            if (attribute?.Converter == null)
                return null;

            if (_converters.TryGetValue(attribute.Converter, out ITypeConverter converter))
                return converter;

            converter = (ITypeConverter) Activator.CreateInstance(attribute.Converter);
            _converters[attribute.Converter] = converter;
            
            return converter;
        }
    }
}
