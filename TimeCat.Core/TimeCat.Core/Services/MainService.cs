using System;
using System.Threading.Tasks;
using Grpc.Core;
using TimeCat.Proto.Commons;
using TimeCat.Proto.Services;

namespace TimeCat.Core.Services
{
    internal class MainService : RpcMainService.RpcMainServiceBase
    {
        public override Task<Empty> SetDateRange(DateRangeRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }

        public override Task<SearchResponse> Search(SearchRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }
    }
}
