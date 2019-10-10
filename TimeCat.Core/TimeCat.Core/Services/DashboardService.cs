using Grpc.Core;
using System;
using System.Linq;
using System.Threading.Tasks;
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
            long totalTime = 0, activeSince = -1;
            Application application = null;
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
                        if (activeMillis * 10000 > passedTime)
                        {
                            totalTime += (activityTicks - activeSince);
                        }
                        activeSince = activityTicks;
                        break;
                    case ActionType.Blur:
                        ApplicationResponse response = new ApplicationResponse()
                        {
                            Application = application.ToRpc(),
                            TotalTime = Google.Protobuf.WellKnownTypes.Duration.FromTimeSpan(new TimeSpan(totalTime))
                        };
                        await responseStream.WriteAsync(response);
                        activeSince = -1;
                        totalTime = 0;
                        application = null;
                        break;
                    default:
                        continue;
                }
            }
        }
    }
}
