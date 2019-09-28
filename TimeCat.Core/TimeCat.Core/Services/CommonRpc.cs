using System.Threading.Tasks;
using Grpc.Core;
using TimeCat.Proto;

namespace TimeCat.Core.Services
{
    class CommonRpc : CommonService.CommonServiceBase
    {
        public override Task<Empty> initialize(Empty request, ServerCallContext context)
        {
            return Task.FromResult(new Empty());
        }
    }
}
