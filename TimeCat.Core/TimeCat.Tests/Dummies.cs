using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using TimeCat.Core.Commons;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;
using TimeCat.Proto.Commons;

namespace TimeCat.Tests
{
    internal static class Dummies
    {
        private static bool dummiesGenerated;

        private static async Task InsertDummies(TimeCatDB _db, DateTimeOffset start)
        {
            TotalUseTimesPerApplications = new Dictionary<int, int>();
            TimelinesPerApplications = new Dictionary<int, List<TimestampRange>>();
            var unitSpan = new TimeSpan(0, 0, 0, 10);
            var rnd = new Random();

            const int applicationCount = 30;
            const int categoriesCount = 10;

            // 카테고리와 어플리케이션 무작위 생성
            for (var i = 0; i < categoriesCount; i++)
                await _db.InsertAsync(new Category
                    { CategoryId = i + 1, Name = $"Awesome Category {i}", Color = Color.Aqua });

            for (var i = 0; i < applicationCount; i++)
                await _db.InsertAsync(new Application
                    { CategoryId = rnd.Next(categoriesCount) + 1, FullName = $"C:\\TestApp{i}.exe", Id = i + 1, IsProductivity = true, Name = $"Test Application {i}", Icon = "chrome", Version = "1.0" });

            var logIndex = 0;
            var now = start;

            // 모든 Application 다 Open
            for (var i = 1; i <= applicationCount; i++)
            {
                await _db.InsertAsync(new Activity
                    { Id = logIndex++, ApplicationId = i, Action = ActionType.Open, Time = now });

                now += unitSpan;
            }

            for (var i = 0; i < 50; i++)
            {
                var application = rnd.Next(applicationCount) + 1;
                var active1 = rnd.Next(100);

                await _db.InsertAsync(new Activity
                    { Id = logIndex++, ApplicationId = application, Action = ActionType.Focus, Time = now });

                now += unitSpan;

                var activeStarts = now;

                for (var j = 0; j < active1; j++)
                {
                    await _db.InsertAsync(new Activity
                        { Id = logIndex++, ApplicationId = application, Action = ActionType.Active, Time = now });

                    now += unitSpan;
                }

                await _db.InsertAsync(new Activity
                    { Id = logIndex++, ApplicationId = application, Action = ActionType.Idle, Time = now });

                var activeEnds = now;
                now += unitSpan;

                await _db.InsertAsync(new Activity
                    { Id = logIndex++, ApplicationId = application, Action = ActionType.Blur, Time = now });

                now += unitSpan;

                if (!TotalUseTimesPerApplications.ContainsKey(application))
                    TotalUseTimesPerApplications[application] = 0;

                if (!TimelinesPerApplications.ContainsKey(application))
                    TimelinesPerApplications[application] = new List<TimestampRange>();

                TimelinesPerApplications[application].Add(new TimestampRange
                    { Start = Timestamp.FromDateTimeOffset(activeStarts), End = Timestamp.FromDateTimeOffset(activeEnds) });

                TotalUseTimesPerApplications[application] += active1 == 0 ? 0 : active1 * unitSpan.Seconds;
            }

            // 모든 Application 다 Close
            for (var i = 1; i <= applicationCount; i++)
            {
                await _db.InsertAsync(new Activity
                    { Id = logIndex++, ApplicationId = i, Action = ActionType.Close, Time = now });

                now += unitSpan;
            }

            LogEndsAt = now;
        }

        public static async Task Create(string dbPath)
        {
            if (dummiesGenerated)
                return;

            dummiesGenerated = true;

            // initialize database
            var _db = TimeCatDB.Instance;
            await _db.Initialize(dbPath);

            // insert dummies
            LogStartsAt = DateTimeOffset.UtcNow;
            await InsertDummies(_db, LogStartsAt);
        }

        public static Dictionary<int, int> TotalUseTimesPerApplications { get; private set; }

        public static Dictionary<int, List<TimestampRange>> TimelinesPerApplications { get; private set; }

        public static DateTimeOffset LogStartsAt { get; private set; }

        public static DateTimeOffset LogEndsAt { get; private set; }
    }
}
