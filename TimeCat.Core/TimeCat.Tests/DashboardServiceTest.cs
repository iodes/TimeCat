using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using NUnit.Framework;
using TimeCat.Core.Commons;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;
using TimeCat.Core.Services;
using TimeCat.Proto.Commons;
using TimeCat.Proto.Services;

namespace TimeCat.Tests
{
    [TestFixture]
    public class DashboardServiceTest : TimeCatTestBase
    {
        private DateTimeOffset offsetStart;
        private DateTimeOffset offsetEnd;
        private Dictionary<int, int> totalTimes;
        private async Task<Tuple<Dictionary<int, int>, DateTimeOffset>> CreateDummies(TimeCatDB _db, DateTimeOffset start)
        {
            totalTimes = new Dictionary<int, int>();
            TimeSpan unitSpan = new TimeSpan(0, 0, 0, 10);
            Random rnd = new Random();
            
            // 카테고리 여러개는 필요없음.
            await _db.InsertAsync(new Category() { CategoryId = 1, Name = "Super Category", Color = Color.Aqua });

            // 어플리케이션 5개 생성
            await _db.InsertAsync(new Application() { CategoryId = 1, FullName = "C:\\abc.exe", Id = 1, IsProductivity = true, Name = "ABC" , Icon = "a", Version = "a"});
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

                for (int j = 0; j < active1; j++)
                {
                    await _db.InsertAsync(new Activity() { Id = logIndex++, ApplicationId = application, Action = ActionType.Active, Time = now });
                    now += unitSpan;
                }
                await _db.InsertAsync(new Activity() { Id = logIndex++, ApplicationId = application, Action = ActionType.Idle, Time = now });
                now += unitSpan;
                await _db.InsertAsync(new Activity() { Id = logIndex++, ApplicationId = application, Action = ActionType.Blur, Time = now });
                now += unitSpan;
                if (!totalTimes.ContainsKey(application))
                {
                    totalTimes[application] = 0;
                }

                totalTimes[application] += active1 == 0 ? 0 : (active1 * unitSpan.Seconds);
            }

            return new Tuple<Dictionary<int, int>, DateTimeOffset>(totalTimes, now);
        }

        public DashboardServiceTest()
        {
            insertDummies().Wait();
        }

        async Task insertDummies()
        {
            // initialize database
            string tmpFile = Path.GetTempFileName();
            TimeCatDB _db = TimeCatDB.Instance;
            await _db.Initialize(tmpFile);

            // insert dummies
            offsetStart = DateTimeOffset.UtcNow;
            var dummiesResult = await CreateDummies(_db, offsetStart);
            offsetEnd = dummiesResult.Item2;
            totalTimes = dummiesResult.Item1;
        }

        [Test, Description("Tests GetToalTime of DashboardService")]
        public async Task GetToalTimeTest() 
        {
            // Create DetailService instance
            DashboardService service = new DashboardService();

            var range = new TimestampRange(){End = Timestamp.FromDateTimeOffset(offsetEnd), Start = Timestamp.FromDateTimeOffset(offsetStart)};

            var response = await service.GetTotalTime(new TotalTimeRequest() {Range = range}, null);

            Assert.AreEqual(totalTimes.Values.Sum(), response.TotalTime.Seconds);
        }

        [Test, Description("Tests GetApplications of DashboardService")]
        public async Task GetApplicationsTest()
        {
            // Create DetailService instance
            DashboardService service = new DashboardService();

            var range = new TimestampRange() { End = Timestamp.FromDateTimeOffset(offsetEnd), Start = Timestamp.FromDateTimeOffset(offsetStart) };

            FakeServerStreamWriter<ApplicationResponse> fakeServerStreamWriter = new FakeServerStreamWriter<ApplicationResponse>();
            var totalTimesForTest = new Dictionary<int, int>(totalTimes);
            fakeServerStreamWriter.Received += applicationResponse =>
            {
                Assert.AreEqual(totalTimesForTest[applicationResponse.Application.Id], applicationResponse.TotalTime.Seconds);
                totalTimesForTest.Remove(applicationResponse.Application.Id);
            };

            await service.GetApplications(new ApplicationRequest() { Range = range }, fakeServerStreamWriter, null);

            Assert.IsEmpty(totalTimesForTest);
        }
    }
}