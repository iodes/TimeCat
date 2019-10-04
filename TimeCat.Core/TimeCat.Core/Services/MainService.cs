using Grpc.Core;
using System;
using System.Threading.Tasks;
using TimeCat.Proto.Commons;
using TimeCat.Proto.Services;

namespace TimeCat.Core.Services
{
    class MainService : RpcMainService.RpcMainServiceBase
    {
        public override Task<Empty> SetDateRange(DateRangeRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }
    }
}
