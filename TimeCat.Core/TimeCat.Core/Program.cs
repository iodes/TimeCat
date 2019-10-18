using System;
using System.Collections.Generic;
using System.Threading;
using Grpc.Core;
using Grpc.Core.Interceptors;
using Serilog;
using Serilog.Sinks.SystemConsole.Themes;
using TimeCat.Core.Interceptors;
using TimeCat.Core.Managers;
using TimeCat.Core.Services;
using TimeCat.Proto.Services;

namespace TimeCat.Core
{
    internal class Program
    {
        private const string host = "localhost";
        private const int port = 37013;

        private static Server _server;
        private static AutoResetEvent _autoResetEvent;

        private static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .WriteTo.Console(theme: AnsiConsoleTheme.Code)
                .CreateLogger();

            ShowInitialize();
            StartServer(host, port);
            Wait();
        }

        public static void ShowInitialize()
        {
            Console.WriteLine(ResourceManager.GetText("Initialize"));
        }

        public static void StartServer(string host, int port)
        {
            var credentials = new SslServerCredentials(new List<KeyCertificatePair>
            {
                new KeyCertificatePair(
                    ResourceManager.GetText("Certificates.timecat.crt"),
                    ResourceManager.GetText("Certificates.timecat.key")
                )
            });

            var interceptor = new ServerCallInterceptor();

            _server = new Server
            {
                Services =
                {
                    RpcCategoryService.BindService(new CategoryService()).Intercept(interceptor),
                    RpcCommonService.BindService(new CommonService()).Intercept(interceptor),
                    RpcDashboardService.BindService(new DashboardService()).Intercept(interceptor),
                    RpcDetailService.BindService(new DetailService()).Intercept(interceptor),
                    RpcMainService.BindService(new MainService()).Intercept(interceptor),
                    RpcReviewService.BindService(new ReviewService()).Intercept(interceptor)
                },
                Ports =
                {
                    new ServerPort(host, port, credentials)
                }
            };

            _server.Start();
            Log.Information("Listening on {Host}:{Port}", host, port);
        }

        public static void CurrentDomain_ProcessExit(object sender, EventArgs e)
        {
            _server.ShutdownAsync().Wait();
            _autoResetEvent.Set();
        }

        public static void Wait()
        {
            _autoResetEvent = new AutoResetEvent(false);
            AppDomain.CurrentDomain.ProcessExit += CurrentDomain_ProcessExit;
            _autoResetEvent.WaitOne();
        }
    }
}
