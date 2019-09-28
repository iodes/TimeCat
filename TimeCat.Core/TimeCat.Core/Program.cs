using Grpc.Core;
using System;
using System.Threading;
using TimeCat.Core.Services;
using TimeCat.Proto;

namespace TimeCat.Core
{
    class Program
    {
        const string host = "localhost";
        const int port = 37013;

        static Server _server;
        static AutoResetEvent _autoResetEvent;

        static void Main(string[] args)
        {
            _autoResetEvent = new AutoResetEvent(false);

            _server = new Server
            {
                Services =
                {
                    CommonService.BindService(new CommonRpc())
                },
                Ports =
                {
                    new ServerPort(host, port, null)
                }
            };

            _server.Start();

            AppDomain.CurrentDomain.ProcessExit += CurrentDomain_ProcessExit;

            _autoResetEvent.WaitOne();
        }

        private static void CurrentDomain_ProcessExit(object sender, EventArgs e)
        {
            _server.ShutdownAsync().Wait();
            _autoResetEvent.Set();
        }
    }
}
