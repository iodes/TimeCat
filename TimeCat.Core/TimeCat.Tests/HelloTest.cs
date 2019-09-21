using System;
using NUnit.Framework;

namespace TimeCat.Tests
{
    [TestFixture]
    public class HelloTest : TimeCatTestBase
    {
        [TestCase("Hello TimeCat!")]
        public void Test(string message)
        {
            Console.WriteLine(message);
        }
    }
}