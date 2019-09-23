using System;
using System.Linq;
using System.Collections.Generic;
using FunctionTest.Interop;

namespace FunctionTest
{
    class Program
    {
        static void Main(string[] args)
        {
            User32.GetOpenWindows()
                .ToList()
                .ForEach(i => Console.WriteLine(i.Value));

            Console.ReadLine();
        }
    }
}
