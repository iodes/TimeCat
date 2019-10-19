using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Grpc.Core;
using Serilog;
using TimeCat.Core.Database;
using TimeCat.Core.Extensions;
using TimeCat.Core.Utility;
using TimeCat.Proto.Services;

namespace TimeCat.Core.Services
{
    public class CommonService : RpcCommonService.RpcCommonServiceBase
    {
        public bool IsInitialized { get; private set; }

        public override async Task<InitializeResponse> Initialize(InitializeRequest request, ServerCallContext context)
        {
            if (IsInitialized)
                return new InitializeResponse
                {
                    IsSuccess = false
                };

            await TimeCatDB.Instance.Initialize(Environment.Database);

            IsInitialized = true;
            Log.Information("TimeCat {AppVersion} initialized", request.AppVersion);

            return new InitializeResponse
            {
                IsSuccess = true,
                OsInformation = new OSInformation
                {
                    Platform = RuntimeInformationUtility.OSPlatform.ToRpc(),
                    Architecture = RuntimeInformation.OSArchitecture.ToRpc(),
                    Description = RuntimeInformation.OSDescription
                }
            };
        }

        public override Task<HealthCheckResponse> HealthCheck(HealthCheckRequest request, ServerCallContext context)
        {
            var response = new HealthCheckResponse
            {
                CurrentTime = TimestampUtility.Now,
                RequestTime = request.CurrentTime
            };

            var duration = response.CurrentTime - request.CurrentTime;
            Log.Verbose("HealthCheck req {Request} res {Response} ({Time:0.000}ms)", request.CurrentTime.Seconds, response.CurrentTime.Seconds, duration.Nanos * 0.000001);

            return Task.FromResult(response);
        }
    }
}
