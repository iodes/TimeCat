using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace TimeCat.Core.Mapper
{
    public static class PropertyMapper<T>
    {
        public static PropertyMappingInfo[] FromInfos { get; }

        public static PropertyMappingInfo[] ToInfos { get; }

        static PropertyMapper()
        {
            var fromInfoList = new List<PropertyMappingInfo>();
            var toInfoList = new List<PropertyMappingInfo>();

            foreach (PropertyInfo property in typeof(T).GetProperties().OrderBy(p => p.Name))
            {
                var fromAttribute = property.GetCustomAttribute<MapFromAttribute>();
                var toAttribute = property.GetCustomAttribute<MapToAttribute>();

                var fromMappingInfo = new PropertyMappingInfo(property, fromAttribute);
                var toMappingInfo = new PropertyMappingInfo(property, toAttribute);

                fromInfoList.Add(fromMappingInfo);
                toInfoList.Add(toMappingInfo);

                if (fromAttribute?.Reverse == true)
                    toInfoList.Add(fromMappingInfo);

                if (toAttribute?.Reverse == true)
                    fromInfoList.Add(toMappingInfo);
            }

            FromInfos = fromInfoList.ToArray();
            ToInfos = toInfoList.ToArray();
        }

        public static IEnumerable<PropertyMappingInfo> FindProperties(string name)
        {
            return FromInfos.Where(i => i.SupportNames.Any(n => n.Equals(name, StringComparison.OrdinalIgnoreCase)));
        }

        public static PropertyMappingInfo[] FindPropertyPath(string propertyPath)
        {
            string[] paths = propertyPath.Split('.');
            var result = new PropertyMappingInfo[paths.Length];
            Type type = typeof(T);
            
            for (var i = 0; i < paths.Length; i++)
            {
                result[i] = FindPropertiesByType(type, paths[i]).FirstOrDefault();

                if (result[i] == null)
                    return null;

                type = result[i].PropertyType;
            }

            return result;
        }
        
        public static void Map(T obj, string propertyPath, object value)
        {
            string[] paths = propertyPath.Split('.', 2);

            if (paths.Length == 1)
            {
                foreach (PropertyMappingInfo propertyInfo in FindProperties(paths[0]))
                {
                    propertyInfo.SetValue(obj, value);
                }
            }
            else
            {
                foreach (PropertyMappingInfo propertyInfo in FindProperties(paths[0]))
                {
                    object objValue = propertyInfo.GetValue(obj);

                    if (objValue == null)
                    {
                        ConstructorInfo constructorInfo = propertyInfo.PropertyType.GetConstructor(new Type[0]);

                        if (constructorInfo == null)
                            return;

                        objValue = constructorInfo.Invoke(null);
                        propertyInfo.PropertyInfo.SetValue(obj, objValue);
                    }

                    MapByType(objValue.GetType(), objValue, paths[1], value);
                }
            }
        }

        public static object FindValue(T obj, string propertyPath)
        {
            var paths = FindPropertyPath(propertyPath);

            if (paths == null)
                return null;

            object value = obj;
            
            foreach (PropertyMappingInfo mappingInfo in paths)
            {
                if (value == null)
                    return null;
                
                value = mappingInfo.PropertyInfo.GetValue(value);
            }

            return value;
        }
        
        private static void MapByType(Type type, object obj, string propertyPath, object value)
        {
            if (type == typeof(T))
            {
                Map((T) obj, propertyPath, value);
                return;
            }
            
            var mapperType = typeof(PropertyMapper<>).MakeGenericType(type);
            var methodInfo = mapperType.GetMethod(nameof(Map), BindingFlags.Public | BindingFlags.Static);

            methodInfo.Invoke(null, new[] { obj, propertyPath, value });
        }
        
        private static IEnumerable<PropertyMappingInfo> FindPropertiesByType(Type type, string name)
        {
            if (type == typeof(T))
                return FindProperties(name);
            
            var mapperType = typeof(PropertyMapper<>).MakeGenericType(type);
            var methodInfo = mapperType.GetMethod(nameof(FindProperties), BindingFlags.Public | BindingFlags.Static);

            return (IEnumerable<PropertyMappingInfo>) methodInfo.Invoke(null, new[] {name});
        }
    }
}
