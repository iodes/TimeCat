using Grpc.Core;
using System;
using System.Collections.Generic;
using System.Threading;
using TimeCat.Core.Managers;
using TimeCat.Core.Services;
using TimeCat.Proto.Services;

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
            ShowInitialize();
            StartServer(host, port);
            Wait();
        }

        static void ShowInitialize()
        {
            Console.WriteLine(ResourceManager.GetText("Initialize"));
        }

        static void StartServer(string host, int port)
        {
//            var credentials = new SslServerCredentials(new List<KeyCertificatePair>
//            {
//                new KeyCertificatePair(
//                    ResourceManager.GetText("Certificates.timecat.crt"),
//                    ResourceManager.GetText("Certificates.timecat.key")
//                )
//            });

            _server = new Server
            {
                Services =
                {
                    RpcCategoryService.BindService(new CategoryService()),
                    RpcCommonService.BindService(new CommonService()),
                    RpcDashboardService.BindService(new DashboardService()),
                    RpcDetailService.BindService(new DetailService()),
                    RpcMainService.BindService(new MainService()),
                    RpcReviewService.BindService(new ReviewService())
                },
                Ports =
                {
                    new ServerPort(host, port, ServerCredentials.Insecure)
                }
            };

            _server.Start();
            Console.WriteLine($"Listening on {host}:{port}");
        }

        static void Wait()
        {
            _autoResetEvent = new AutoResetEvent(false);
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
