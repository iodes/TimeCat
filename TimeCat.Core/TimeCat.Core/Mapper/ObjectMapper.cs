using System;
using System.Collections.Generic;
using System.Linq;

namespace TimeCat.Core.Mapper
{
    public sealed class ObjectMapper<TFrom, TTo>
    {
        private static readonly PropertyMatch[] _propertyMatches;

        static ObjectMapper()
        {
            var propertyMatchList = new List<PropertyMatch>();

            foreach (PropertyMappingInfo fromInfo in PropertyMapper<TTo>.FromInfos)
            {
                foreach (PropertyMappingInfo toInfo in PropertyMapper<TFrom>.ToInfos)
                {
                    var intersect = fromInfo.SupportNames
                        .Intersect(toInfo.SupportNames, StringComparer.OrdinalIgnoreCase)
                        .ToArray();

                    if (intersect.Length == 0)
                        continue;

                    var propertyMatch = new PropertyMatch(fromInfo, toInfo);
                    propertyMatchList.Add(propertyMatch);
                }
            }

            _propertyMatches = propertyMatchList.ToArray();
        }

        public static void Map(TFrom from, TTo to)
        {
            foreach (PropertyMatch match in _propertyMatches)
            {
                if (match.To.IsPath)
                {
                    PropertyMapper<TTo>.Map(to, match.To.Path, match.To.GetValue(from));
                }
                else if (match.From.IsPath)
                {
                    object value = PropertyMapper<TFrom>.FindValue(from, match.From.Path);
                    
                    if (match.To.Converter?.CanConvertTo(value?.GetType()) == true)
                    {
                        value = match.To.Converter.ConvertTo(value);
                    }
                    
                    match.From.SetValue(to, value);
                }
                else
                {
                    match.From.SetValue(to, match.To.GetValue(from));
                }
            }
        }

        public static TTo Map(TFrom from)
        {
            var to = Activator.CreateInstance<TTo>();
            Map(from, to);

            return to;
        }

        public static TTo[] Map(params TFrom[] fromArray)
        {
            return fromArray.Select(Map).ToArray();
        }

        struct PropertyMatch
        {
            public readonly PropertyMappingInfo From;
            public readonly PropertyMappingInfo To;

            public PropertyMatch(PropertyMappingInfo from, PropertyMappingInfo to)
            {
                From = from;
                To = to;
            }
        }
    }
}
