using System;

namespace FunctionTest
{
    class Program
    {
        static IdleDetector idleDetector = new IdleDetector();

        static void Main(string[] args)
        {
            //idleDetector.Start();
            idleDetector.IdleDetected += (s, e) => 
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine("IDLE Detected: " + e.IdleMillseconds + "ms");
            };

            idleDetector.IdleReleased += (s, e) =>
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("IDLE Released: " + e.IdleMillseconds + "ms");
            };

            FocusDetector.Start();
            Console.ReadLine();
            FocusDetector.Stop();
        }
    }
}
