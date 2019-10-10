using Grpc.Core;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using TimeCat.Core.Commons;
using TimeCat.Core.Extensions;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;
using TimeCat.Proto.Commons;
using TimeCat.Proto.Services;
using Google.Protobuf.WellKnownTypes;

namespace TimeCat.Core.Services
{
    class DashboardService : RpcDashboardService.RpcDashboardServiceBase
    {
        private readonly TimeCatDB _db = TimeCatDB.Instance;
        public override async Task<TotalTimeResponse> GetTotalTime(TotalTimeRequest request, ServerCallContext context)
        {
            long totalTime = 0, activeSince = -1;
            await foreach(Activity activity in _db.GetActivities())
            {
                if (activity.Time < request.Range.Start.ToDateTime() || activity.Time > request.Range.End.ToDateTime())
                    continue;
                long activityTicks = activity.Time.Ticks;
                switch(activity.Action)
                {
                    case ActionType.Active:
                        if (activeSince == -1)
                            activeSince = activityTicks;
                        break;
                    case ActionType.Idle:
                        if (activeSince != -1)
                        {
                            totalTime += activityTicks - activeSince;
                            activeSince = -1;
                        }
                        break;
                    default:
                        continue;
                }
            }

            return new TotalTimeResponse()
            {
                TotalTime = Duration.FromTimeSpan(new TimeSpan(totalTime))
            };
        }

        public override async Task GetApplications(ApplicationRequest request, IServerStreamWriter<ApplicationResponse> responseStream, ServerCallContext context)
        {
            Dictionary<int, DateTimeOffset> startTimes = new Dictionary<int, DateTimeOffset>();
            await foreach (Activity activity in _db.GetActivities())
            {
                if (activity.Time < request.Range.Start.ToDateTime() || activity.Time > request.Range.End.ToDateTime())
                    continue;
                switch (activity.Action)
                {
                    case ActionType.Active:
                        if (!startTimes.ContainsKey(activity.ApplicationId))
                        {
                            startTimes.Add(activity.ApplicationId, activity.Time);
                        }
                        break;
                    case ActionType.Idle:
                        if (startTimes.ContainsKey(activity.ApplicationId))
                        {
                            Application application = await _db.GetAsync<Application>(activity.ApplicationId);
                            ApplicationResponse response = new ApplicationResponse()
                            {
                                Application = application.ToRpc(),
                                TotalTime = Duration.FromTimeSpan(activity.Time - startTimes[activity.ApplicationId])
                            };
                            startTimes.Remove(activity.ApplicationId);
                        }
                        break;
                    default:
                        continue;
                }
            }
        }
    }
}
