using System;
using System.Collections.Generic;

namespace TimeCat.Core.Extensions
{
    internal static class EnumerableExtension
    {
        public static void ForEach<T>(this IEnumerable<T> source, Action<T> action)
        {
            if (action == null)
                throw new ArgumentNullException(nameof(action));

            IEnumerator<T> enumerator = source.GetEnumerator();

            while (enumerator.MoveNext())
                action(enumerator.Current);
        }

        public static void ForEach<T>(this IEnumerable<T> source, Action<T, int> action)
        {
            if (action == null)
                throw new ArgumentNullException(nameof(action));

            IEnumerator<T> enumerator = source.GetEnumerator();
            var index = -1;

            while (enumerator.MoveNext())
                action(enumerator.Current, ++index);
        }
    }
}
