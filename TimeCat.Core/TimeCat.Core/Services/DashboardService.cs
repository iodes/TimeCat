using Grpc.Core;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using TimeCat.Core.Commons;
using TimeCat.Core.Extensions;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;
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

            // 요청받은 기간 내의 Active 및 Idle activity만 가져온다
            var activities = from activity in _db.GetActivities()
                where activity.Time >= request.Range.Start.ToDateTime() && activity.Time <= request.Range.End.ToDateTime()
                where activity.Action == ActionType.Active || activity.Action == ActionType.Idle
                select activity;

            await foreach(var activity in activities)
            {
                var activityTicks = activity.Time.Ticks;
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
                }
            }

            return new TotalTimeResponse()
            {
                TotalTime = Duration.FromTimeSpan(new TimeSpan(totalTime))
            };
        }

        public override async Task GetApplications(ApplicationRequest request, IServerStreamWriter<ApplicationResponse> responseStream, ServerCallContext context)
        {
            var startTimes = new Dictionary<int, DateTimeOffset>();

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
                        if (!startTimes.ContainsKey(activity.ApplicationId))
                        {
                            startTimes.Add(activity.ApplicationId, activity.Time);
                        }
                        break;
                    case ActionType.Idle:
                        if (startTimes.ContainsKey(activity.ApplicationId))
                        {
                            var application = await _db.GetAsync<Application>(activity.ApplicationId);
                            var response = new ApplicationResponse()
                            {
                                Application = application.ToRpc(),
                                TotalTime = Duration.FromTimeSpan(activity.Time - startTimes[activity.ApplicationId])
                            };
                            await responseStream.WriteAsync(response);
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
