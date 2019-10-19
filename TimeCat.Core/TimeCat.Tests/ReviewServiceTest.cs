using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using NUnit.Framework;
using TimeCat.Core.Services;
using TimeCat.Proto.Commons;
using TimeCat.Proto.Services;

namespace TimeCat.Tests
{
    [TestFixture]
    public class ReviewServiceTest : TimeCatTestBase
    {
        [Test, Description("Tests GetTimeline of TimelineService")]
        public async Task GetTimelineTest()
        {
            // Create DetailService instance
            ReviewService service = new ReviewService();

            var range = new TimestampRange() { End = Timestamp.FromDateTimeOffset(offsetEnd), Start = Timestamp.FromDateTimeOffset(offsetStart) };

            FakeServerStreamWriter<TimelineResponse> fakeServerStreamWriter = new FakeServerStreamWriter<TimelineResponse>();
            var timelinesForTest = new Dictionary<int, List<TimestampRange>>(timelines);
            fakeServerStreamWriter.Received += applicationResponse =>
            {
                Assert.Contains(applicationResponse.Range, timelinesForTest[applicationResponse.Application.Id]);

                timelinesForTest[applicationResponse.Application.Id].Remove(applicationResponse.Range);

                if (timelinesForTest[applicationResponse.Application.Id].Count == 0)
                    timelinesForTest.Remove(applicationResponse.Application.Id);
            };

            await service.GetTimeline(new TimelineRequest() { Range = range }, fakeServerStreamWriter, null);

            Assert.IsEmpty(timelinesForTest);
        }
    }
}