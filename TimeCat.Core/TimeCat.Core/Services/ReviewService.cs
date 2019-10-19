using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
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
    public class ReviewService : RpcReviewService.RpcReviewServiceBase
    {
        private readonly TimeCatDB _db = TimeCatDB.Instance;

        public override async Task GetTimeline(TimelineRequest request, IServerStreamWriter<TimelineResponse> responseStream, ServerCallContext context)
        {
            var timestampRanges = new Dictionary<int, TimestampRange>();

            // 요청받은 기간 내의 activity만 가져온다.
            var activities = from activity in _db.GetActivities()
                where activity.Time >= request.Range.Start.ToDateTime() && activity.Time <= request.Range.End.ToDateTime()
                where activity.Action == ActionType.Active || activity.Action == ActionType.Idle ||
                      activity.Action == ActionType.Blur || activity.Action == ActionType.Focus
                orderby activity.Time
                select activity;

            Application applicationNow = null;
            await foreach (var activity in activities)
            {
                var application = await _db.GetAsync<Application>(activity.ApplicationId);
                switch (activity.Action)
                {
                    case ActionType.Focus:
                        applicationNow = application;
                        break;
                    case ActionType.Active:
                        if (applicationNow == null)
                            applicationNow = application;
                        if (!timestampRanges.ContainsKey(applicationNow.Id))
                        {
                            timestampRanges[applicationNow.Id] = new TimestampRange(){Start = Timestamp.FromDateTimeOffset(activity.Time)};
                        }
                        break;
                    case ActionType.Blur:
                    case ActionType.Idle:
                        if (timestampRanges.ContainsKey(applicationNow.Id))
                        {
                            timestampRanges[applicationNow.Id].End = Timestamp.FromDateTimeOffset(activity.Time);
                            var response = new TimelineResponse()
                            {
                                Application = applicationNow.ToRpc(),
                                Range = timestampRanges[applicationNow.Id]
                            };

                            timestampRanges.Remove(applicationNow.Id);
                            await responseStream.WriteAsync(response);
                        }
                        break;
                    default:
                        continue;
                }
            }
        }
    }
}
