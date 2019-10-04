using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeCat.Core.Extensions
{
    static class AsyncEnumerableExtension
    {
        public static async Task<T[]> ToArray<T>(this IAsyncEnumerable<T> source)
        {
            return (await source.ToList()).ToArray();
        }

        public static async Task<IList<T>> ToList<T>(this IAsyncEnumerable<T> source)
        {
            var list = new List<T>();

            await foreach (T item in source)
                list.Add(item);

            return list;
        }
    }
}
