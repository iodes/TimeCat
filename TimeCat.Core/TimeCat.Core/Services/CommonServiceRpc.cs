using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using System;
using System.Threading.Tasks;
using TimeCat.Core.Database;
using TimeCat.Core.Utility;
using TimeCat.Proto.Services;

namespace TimeCat.Core.Services
{
    class CommonServiceRpc : CommonService.CommonServiceBase
    {
        public bool IsInitialized { get; private set; }

        public override async Task<InitializeResponse> Initialize(InitializeRequest request, ServerCallContext context)
        {
            if (!IsInitialized)
            {
                return new InitializeResponse() 
                {
                    IsSuccess = false 
                };
            }

            await TimeCatDB.Instance.Initialize(Environment.Database);

            IsInitialized = true;
            Console.WriteLine($"TimeCat {request.AppVersion} initialized");

            return new InitializeResponse() 
            {
                IsSuccess = true
            };
        }

        public override Task<HealthCheckResponse> HealthCheck(HealthCheckRequest request, ServerCallContext context)
        {
            var response = new HealthCheckResponse()
            {
                CurrentTime = TimestampUtility.Now,
                RequestTime = request.CurrentTime
            };

            Duration duration = response.CurrentTime - request.CurrentTime;
            Console.WriteLine($"HealthCheck req {request.CurrentTime.Seconds} res {response.CurrentTime.Seconds} ({duration.Nanos * 0.000001}ms)");

            return Task.FromResult(response);
        }
    }
}
