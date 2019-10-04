using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace TimeCat.Core.Mapper
{
    public sealed class PropertyMappingInfo
    {
        public string Name => PropertyInfo.Name;

        public string Path => _mapAttribute?.Name;

        public bool IsPath { get; }

        public Type PropertyType => PropertyInfo.PropertyType;

        public PropertyInfo PropertyInfo { get; }
        
        public ITypeConverter Converter { get; }
        
        public MappingFlags Flags { get; }

        public IEnumerable<string> SupportNames
        {
            get
            {
                if (_mapAttribute != null)
                {
                    if (IsPath)
                        yield return _mapAttribute.Name.Split('.', 2)[0];
                    else
                        yield return _mapAttribute.Name;
                }

                yield return PropertyInfo.Name;
            }
        }

        private readonly MapAttribute _mapAttribute;

        public PropertyMappingInfo(PropertyInfo propertyInfo, MapAttribute attribute = null)
        {
            _mapAttribute = attribute;

            PropertyInfo = propertyInfo;
            Converter = TypeConverter.From(_mapAttribute);
            IsPath = _mapAttribute?.Name.Contains('.') == true;
            
            switch (_mapAttribute)
            {
                case MapToAttribute _:
                    Flags = _mapAttribute.Reverse ? MappingFlags.TwoWay : MappingFlags.To;
                    break;
                
                case MapFromAttribute _:
                    Flags = _mapAttribute.Reverse ? MappingFlags.TwoWay : MappingFlags.From;
                    break;
                
                default:
                    Flags = MappingFlags.None;
                    break;
            }
        }

        public void SetValue(object obj, object value)
        {
            if (Converter?.CanConvertFrom(value?.GetType()) == true)
            {
                value = Converter.ConvertFrom(value);
            }

            Type valueType = value?.GetType();
            
            if (!IsAssignableFrom(valueType))
            {
                if (!PropertyType.IsEnum || valueType?.IsEnum == false)
                {
                    return;
                }

                value = EnumMapper.Map(PropertyType, value);
            }
            
            // TODO: Protobuff 3.0 field can't set null (TypeConverter Refactoring)
            if (value == null && PropertyInfo.PropertyType == typeof(string))
                value = string.Empty;
            
            PropertyInfo.SetValue(obj, value);
        }
        
        public object GetValue(object obj)
        {
            object value = PropertyInfo.GetValue(obj);
            
            if (Converter?.CanConvertTo(value?.GetType()) == true)
            {
                value = Converter.ConvertTo(value);
            }
            
            return value;
        }

        public object GetValueByPath(object obj, string propertyPath)
        {
            ValidatePathProperty(propertyPath);

            obj = PropertyInfo.GetValue(obj);
            
            foreach (var path in propertyPath.Split('.').Skip(1))
            {
                if (obj == null)
                    break;

                PropertyInfo pathPropertyInfo = obj.GetType().GetProperty(path);

                if (pathPropertyInfo == null)
                    break;

                obj = pathPropertyInfo.GetValue(obj);
            }

            return obj;
        }

        private bool IsAssignableFrom(Type type)
        {
            if (!PropertyType.IsAssignableFrom(type))
            {
                return Nullable.GetUnderlyingType(PropertyType) == type;
            }

            return true;
        }

        public override string ToString()
        {
            return
                $"<{PropertyInfo.DeclaringType.Name}>.[{string.Join(", ", SupportNames)}] ({(IsPath ? "Path" : "single")})";
        }
        
        private static void ValidatePathProperty(string propertyPath)
        {
            if (propertyPath?.Contains('.') == false)
                throw new MapperException($"\"{propertyPath}\" is not path property");
        }
    }
}
