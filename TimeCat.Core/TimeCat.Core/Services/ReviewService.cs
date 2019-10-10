using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TimeCat.Core.Commons;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;
using TimeCat.Core.Extensions;
using TimeCat.Proto.Commons;
using TimeCat.Proto.Services;

namespace TimeCat.Core.Services
{
    class ReviewService : RpcReviewService.RpcReviewServiceBase
    {
        private readonly TimeCatDB _db = TimeCatDB.Instance;

        public override async Task GetTimeline(TimelineRequest request, IServerStreamWriter<TimelineResponse> responseStream, ServerCallContext context)
        {
            Dictionary<int, TimestampRange> timestampRanges = new Dictionary<int, TimestampRange>();
            await foreach (Activity activity in _db.GetActivities())
            {
                if (activity.Time < request.Range.Start.ToDateTime() || activity.Time > request.Range.End.ToDateTime())
                    continue;
                switch (activity.Action)
                {
                    case ActionType.Active:
                        if (!timestampRanges.ContainsKey(activity.ApplicationId))
                        {
                            timestampRanges.Add(activity.ApplicationId, new TimestampRange() { Start = Timestamp.FromDateTimeOffset(activity.Time) });
                        }
                        break;
                    case ActionType.Idle:
                        if (timestampRanges.ContainsKey(activity.ApplicationId))
                        {
                            timestampRanges[activity.ApplicationId].End = Timestamp.FromDateTimeOffset(activity.Time);
                            Application application = await _db.GetAsync<Application>(activity.ApplicationId);
                            TimelineResponse response = new TimelineResponse()
                            {
                                Application = application.ToRpc(),
                                Range = timestampRanges[activity.ApplicationId]
                            };
                            await responseStream.WriteAsync(response);
                            timestampRanges.Remove(activity.ApplicationId);
                        }
                        break;
                    default:
                        continue;
                }
            }
        }
    }
}
