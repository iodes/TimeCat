using Grpc.Core;
using Grpc.Core.Interceptors;
using Serilog;
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace TimeCat.Core.Interceptors
{
    public class ServerCallInterceptor : Interceptor
    {
        #region Private Methods
        private async Task<T> Run<T>(ServerCallContext context, Task<T> handlerTask)
        {
            try
            {
                var stopwatch = Stopwatch.StartNew();
                var response = await handlerTask;
                stopwatch.Stop();

                WriteLog(context, stopwatch.Elapsed);
                return response;
            }
            catch (Exception ex)
            {
                throw HandleException(context, ex);
            }
        }

        private async Task Run(ServerCallContext context, Task handlerTask)
        {
            try
            {
                var stopwatch = Stopwatch.StartNew();
                await handlerTask;
                stopwatch.Stop();

                WriteLog(context, stopwatch.Elapsed);
            }
            catch (Exception ex)
            {
                throw HandleException(context, ex);
            }
        }

        private void WriteLog(ServerCallContext context, TimeSpan elapsed)
        {
            Log.Information("Request {RequestMethod} responded {StatusCode} in {Elapsed:0.0000} ms.",
                context.Method, context.Status.StatusCode, elapsed.TotalMilliseconds);
        }

        private Exception HandleException(ServerCallContext context, Exception exception)
        {
            Log.Logger.Error(exception, "An error occurred while requesting {RequestMethod}", context.Method);

            return exception;
        }
        #endregion

        public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(TRequest request, ServerCallContext context, UnaryServerMethod<TRequest, TResponse> continuation)
        {
            return await Run(context, base.UnaryServerHandler(request, context, continuation));
        }

        public override async Task<TResponse> ClientStreamingServerHandler<TRequest, TResponse>(IAsyncStreamReader<TRequest> requestStream, ServerCallContext context, ClientStreamingServerMethod<TRequest, TResponse> continuation)
        {
            return await Run(context, base.ClientStreamingServerHandler(requestStream, context, continuation));
        }

        public override async Task ServerStreamingServerHandler<TRequest, TResponse>(TRequest request, IServerStreamWriter<TResponse> responseStream, ServerCallContext context, ServerStreamingServerMethod<TRequest, TResponse> continuation)
        {
            await Run(context, base.ServerStreamingServerHandler(request, responseStream, context, continuation));
        }

        public override async Task DuplexStreamingServerHandler<TRequest, TResponse>(IAsyncStreamReader<TRequest> requestStream, IServerStreamWriter<TResponse> responseStream, ServerCallContext context, DuplexStreamingServerMethod<TRequest, TResponse> continuation)
        {
            await Run(context, base.DuplexStreamingServerHandler(requestStream, responseStream, context, continuation));
        }
    }
}
