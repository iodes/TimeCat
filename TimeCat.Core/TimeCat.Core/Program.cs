﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Core.Interceptors;
using Serilog;
using Serilog.Sinks.SystemConsole.Themes;
using TimeCat.Core.Database;
using TimeCat.Core.Driver;
using TimeCat.Core.Driver.Windows;
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

        private static IApplicationDriver _applicationDriver;

        private static async Task Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Verbose()
                .WriteTo.Console(theme: AnsiConsoleTheme.Code)
                .CreateLogger();

            ShowInitialize();
            await StartServer(host, port);
            StartDriver();
            
            if (_applicationDriver == null)
                Wait();
        }

        public static void ShowInitialize()
        {
            Console.WriteLine(ResourceManager.GetText("Initialize"));
        }

        public static async Task StartServer(string host, int port)
        {
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
                    new ServerPort(host, port, ServerCredentials.Insecure)
                }
            };

            _server.Start();

#if FAKE
            Log.Information("It's fake time!");
            await TimeCatDB.Instance.Initialize(Environment.Database);
            await Dummies.Create();
            Log.Information("Fake DB prepare got succeed");
#endif
            Log.Information("Listening on {Host}:{Port}", host, port);
        }

        private static void StartDriver()
        {
#if WINDOWS
            _applicationDriver = new WindowsApplicationDriver();
#elif LINUX
            // LINUX
#elif UNIX
            // UNIX
#endif

            if (_applicationDriver != null)
            {
                _applicationDriver.StateChanged += Driver_StateChanged;
                _applicationDriver.Start();   
            }
        }

        private static void Driver_StateChanged(object sender, Driver.EventArg.StateChangedEventArgs e)
        {
            Log.Information("[{ActionType}] {ApplicationName}", e.StateType, e.Application.FullName);
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
