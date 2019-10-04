using TimeCat.Core.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TimeCat.Core.Utilities
{
    public static class MappingUtility
    {
        private delegate object MapDelegate(object source);

        private static readonly Dictionary<Guid, MapDelegate> _mapDelegates = new Dictionary<Guid, MapDelegate>();
 
        public static TDestination Map<TDestination>(object source)
        {
            object result = GetMapDelegate<TDestination>(source.GetType())(source);

            if (result is TDestination destination)
                return destination;

            return default;
        }

        public static IEnumerable<TDestination> Map<TDestination>(IEnumerable<object> source)
        {
            return source.Select(Map<TDestination>);
        }
        
        public static TDestination Map<TSource, TDestination>(TSource source, TDestination destination)
        {
            ObjectMapper<TSource, TDestination>.Map(source, destination);
            return destination;
        }
        
        public static IEnumerable<TDestination> Map<TSource, TDestination>(TSource source, IEnumerable<TDestination> destinations)
        {
            return destinations.Select(destination => Map(source, destination));
        }

        private static MapDelegate GetMapDelegate<TTo>(Type fromType)
        {
            Guid guid = Merge(fromType.GUID, typeof(TTo).GUID);

            if (_mapDelegates.TryGetValue(guid, out MapDelegate mapDelegate))
                return mapDelegate;

            var mapperType = typeof(ObjectMapper<,>).MakeGenericType(fromType, typeof(TTo));
            var methodInfo = mapperType.GetMethod("Map", new[] { fromType });
            
            mapDelegate = (obj) => methodInfo.Invoke(null, new[] { obj });
            _mapDelegates[guid] = mapDelegate;

            return mapDelegate;
        }
        
        private static Guid Merge(Guid guid1, Guid guid2)
        {
            byte[] destByte = new byte[16];
            byte[] guid1Byte = guid1.ToByteArray();
            byte[] guid2Byte = guid2.ToByteArray();

            for (int i = 0; i < 16; i++)
                destByte[i] = (byte)(guid1Byte[i] ^ guid2Byte[i]);

            return new Guid(destByte);
        }
    }
}
