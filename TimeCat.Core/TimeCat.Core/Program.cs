using Grpc.Core;
using System;
using System.Collections.Generic;
using System.Threading;
using TimeCat.Core.Managers;
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
            Console.WriteLine(ResourceManager.GetText("Initialize.txt"));

            _autoResetEvent = new AutoResetEvent(false);

            var credentials = new SslServerCredentials(new List<KeyCertificatePair>
            {
                new KeyCertificatePair(
                    ResourceManager.GetText("Certificates.timecat.crt"),
                    ResourceManager.GetText("Certificates.timecat.key")
                )
            });

            _server = new Server
            {
                Services =
                {
                    CommonService.BindService(new CommonRpc())
                },
                Ports =
                {
                    new ServerPort(host, port, credentials)
                }
            };

            _server.Start();

            AppDomain.CurrentDomain.ProcessExit += CurrentDomain_ProcessExit;

            _autoResetEvent.WaitOne();
        }

        static void CurrentDomain_ProcessExit(object sender, EventArgs e)
        {
            _server.ShutdownAsync().Wait();
            _autoResetEvent.Set();
        }
    }
}
