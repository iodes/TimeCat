using Grpc.Core;
using System;
using System.Threading.Tasks;
using TimeCat.Proto.Services;

namespace TimeCat.Core.Services
{
    class ReviewService : RpcReviewService.RpcReviewServiceBase
    {
        public override Task GetTimeline(TimelineRequest request, IServerStreamWriter<TimelineResponse> responseStream, ServerCallContext context)
        {
            throw new NotImplementedException();
        }
    }
}
