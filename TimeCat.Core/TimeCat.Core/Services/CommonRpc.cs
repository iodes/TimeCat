using System.Threading.Tasks;
using Grpc.Core;
using TimeCat.Proto;

namespace TimeCat.Core.Services
{
    class CommonRpc : CommonService.CommonServiceBase
    {
        public override Task<Void> initialize(Void request, ServerCallContext context)
        {
            return Task.FromResult(new Void());
        }
    }
}
