using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using System;
using System.Linq;
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
            var timestampRanges = new Dictionary<int, TimestampRange>();

            // 요청받은 기간 내의 Active 및 Idle activity만 가져온다
            var activities = from activity in _db.GetActivities()
                where activity.Time > request.Range.Start.ToDateTime() && activity.Time < request.Range.End.ToDateTime()
                where activity.Action == ActionType.Active || activity.Action == ActionType.Idle
                select activity;

            await foreach (var activity in activities)
            {
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
                            var application = await _db.GetAsync<Application>(activity.ApplicationId);
                            var response = new TimelineResponse()
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
