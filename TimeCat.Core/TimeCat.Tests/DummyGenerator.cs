using System;
using System.Collections.Generic;
using System.Drawing;
using System.Dynamic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using TimeCat.Core;
using TimeCat.Core.Commons;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;
using TimeCat.Proto.Commons;

namespace TimeCat.Tests
{
    static class DummyGenerator
    {
        private static Dictionary<int, int> totalTimes;
        private static Dictionary<int, List<TimestampRange>> timeRanges;
        private static DateTimeOffset offsetStart;
        private static DateTimeOffset offsetEnd;
        private static bool dummiesGenerated = false;
        private static async Task CreateDummies(TimeCatDB _db, DateTimeOffset start)
        {
            totalTimes = new Dictionary<int, int>();
            timeRanges = new Dictionary<int, List<TimestampRange>>();
            TimeSpan unitSpan = new TimeSpan(0, 0, 0, 10);
            Random rnd = new Random();

            // 카테고리 여러개는 필요없음.
            await _db.InsertAsync(new Category() { CategoryId = 1, Name = "Super Category", Color = Color.Aqua });

            // 어플리케이션 5개 생성
            await _db.InsertAsync(new Application() { CategoryId = 1, FullName = "C:\\abc.exe", Id = 1, IsProductivity = true, Name = "ABC", Icon = "a", Version = "a" });
            await _db.InsertAsync(new Application() { CategoryId = 1, FullName = "C:\\123.exe", Id = 2, IsProductivity = true, Name = "123", Icon = "a", Version = "a" });
            await _db.InsertAsync(new Application() { CategoryId = 1, FullName = "C:\\Star.exe", Id = 3, IsProductivity = true, Name = "Platinum Star", Icon = "a", Version = "a" });
            await _db.InsertAsync(new Application() { CategoryId = 1, FullName = "C:\\Kim.exe", Id = 4, IsProductivity = true, Name = "Kimmy", Icon = "a", Version = "a" });
            await _db.InsertAsync(new Application() { CategoryId = 1, FullName = "C:\\Do.exe", Id = 5, IsProductivity = true, Name = "dai", Icon = "a", Version = "a" });

            int logIndex = 0;
            var now = start;

            for (int i = 0; i < 10; i++)
            {
                int application = rnd.Next(5) + 1;
                int active1 = rnd.Next(100);

                await _db.InsertAsync(new Activity() { Id = logIndex++, ApplicationId = application, Action = ActionType.Focus, Time = now });
                now += unitSpan;

                DateTimeOffset activeStarts = now;
                for (int j = 0; j < active1; j++)
                {
                    await _db.InsertAsync(new Activity() { Id = logIndex++, ApplicationId = application, Action = ActionType.Active, Time = now });
                    now += unitSpan;
                }
                await _db.InsertAsync(new Activity() { Id = logIndex++, ApplicationId = application, Action = ActionType.Idle, Time = now });
                DateTimeOffset activeEnds = now;
                now += unitSpan;
                await _db.InsertAsync(new Activity() { Id = logIndex++, ApplicationId = application, Action = ActionType.Blur, Time = now });
                now += unitSpan;

                if (!totalTimes.ContainsKey(application))
                {
                    totalTimes[application] = 0;
                }
                if (!timeRanges.ContainsKey(application))
                    timeRanges[application] = new List<TimestampRange>();
                timeRanges[application].Add(new TimestampRange(){Start = Timestamp.FromDateTimeOffset(activeStarts), End = Timestamp.FromDateTimeOffset(activeEnds)});
                totalTimes[application] += active1 == 0 ? 0 : (active1 * unitSpan.Seconds);
            }

            offsetEnd = now;
        }

        public static async Task InsertDummies(string dbPath)
        {
            if (dummiesGenerated)
                return;
            dummiesGenerated = true;

            // initialize database
            TimeCatDB _db = TimeCatDB.Instance;
            await _db.Initialize(dbPath);

            // insert dummies
            offsetStart = DateTimeOffset.UtcNow;
            await CreateDummies(_db, offsetStart);
        }
        public static Dictionary<int, int> TotalUseTimesPerApplications => totalTimes;

        public static Dictionary<int, List<TimestampRange>> TimelinesPerApplications => timeRanges;
        public static DateTimeOffset LogStartsAt => offsetStart;
        public static DateTimeOffset LogEndsAt => offsetEnd;
    }
}
