using Grpc.Core;
using System;
using System.Threading.Tasks;
using TimeCat.Core.Commons;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;
using TimeCat.Core.Extensions;
using TimeCat.Proto.Services;

namespace TimeCat.Core.Services
{
    class ReviewService : RpcReviewService.RpcReviewServiceBase
    {
        private readonly TimeCatDB _db = TimeCatDB.Instance;
        const int activeMillis = 5000;
        public override async Task GetTimeline(TimelineRequest request, IServerStreamWriter<TimelineResponse> responseStream, ServerCallContext context)
        {
            long activeSince = -1, activeUntil = -1;
            Application application = null;
            TimelineResponse response;
            await foreach (Activity activity in _db.GetActivities())
            {
                if (activity.Time < request.Range.Start.ToDateTime() || activity.Time > request.Range.End.ToDateTime())
                    continue;
                switch (activity.Action)
                {
                    case ActionType.Focus:
                        application = await _db.GetAsync<Application>(activity.ApplicationId);
                        activeSince = activity.Time.Ticks;
                        break;
                    case ActionType.Active:
                        long activityTicks = activity.Time.Ticks;
                        long passedTime = activityTicks - activeSince;
                        if (passedTime < activeMillis * 10000)
                        {
                            activeUntil = activityTicks;
                        } else
                        {
                            response = new TimelineResponse()
                            {
                                Application = application.ToRpc(),
                                Range = new Proto.Commons.TimestampRange() { 
                                    Start = Google.Protobuf.WellKnownTypes.Timestamp.FromDateTime(new DateTime(activeSince)),
                                    End = Google.Protobuf.WellKnownTypes.Timestamp.FromDateTime(new DateTime(activeUntil))
                                }
                            };
                            await responseStream.WriteAsync(response);
                            activeSince = -1;
                            activeUntil = -1;
                            application = null;
                            break;
                        }
                        break;
                    case ActionType.Blur:
                        response = new TimelineResponse()
                        {
                            Application = application.ToRpc(),
                            Range = new Proto.Commons.TimestampRange()
                            {
                                Start = Google.Protobuf.WellKnownTypes.Timestamp.FromDateTime(new DateTime(activeSince)),
                                End = Google.Protobuf.WellKnownTypes.Timestamp.FromDateTime(new DateTime(activeUntil))
                            }
                        };
                        await responseStream.WriteAsync(response);
                        activeSince = -1;
                        activeUntil = -1;
                        application = null;
                        break;
                    default:
                        continue;
                }
            }
        }
    }
}
