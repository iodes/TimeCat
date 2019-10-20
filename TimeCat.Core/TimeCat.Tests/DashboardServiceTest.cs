using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using NUnit.Framework;
using TimeCat.Core.Services;
using TimeCat.Proto.Commons;
using TimeCat.Proto.Services;

namespace TimeCat.Tests
{
    [TestFixture]
    public class DashboardServiceTest : TimeCatTestBase
    {

        public DashboardServiceTest()
        {
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