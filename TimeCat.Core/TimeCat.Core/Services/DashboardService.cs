using Grpc.Core;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net.Mime;
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
                orderby activity.Time
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
            var totalTimes = new Dictionary<int, TimeSpan>();
            var startTimes = new Dictionary<int, DateTimeOffset>();

            // 요청받은 기간 내의 activity만 가져온다.
            var activities = from activity in _db.GetActivities()
                             where activity.Time > request.Range.Start.ToDateTime() && activity.Time < request.Range.End.ToDateTime()
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
                        if (!startTimes.ContainsKey(applicationNow.Id))
                        {
                            startTimes[applicationNow.Id] = activity.Time;
                        }

                        break;

                    case ActionType.Blur:
                    case ActionType.Idle:
                        if (startTimes.ContainsKey(applicationNow.Id))
                        {
                            if (!totalTimes.ContainsKey(applicationNow.Id))
                            {
                                totalTimes[applicationNow.Id] = TimeSpan.Zero;
                            }

                            totalTimes[applicationNow.Id] += activity.Time - startTimes[applicationNow.Id];
                        }

                        break;

                    default:
                        continue;
                }
            }

            foreach (var i in totalTimes)
            {
                var response = new ApplicationResponse()
                {
                    Application = (await _db.GetAsync<Application>(i.Key)).ToRpc(),
                    TotalTime = Duration.FromTimeSpan(i.Value)
                };

                await responseStream.WriteAsync(response);
            }
        }
    }
}
