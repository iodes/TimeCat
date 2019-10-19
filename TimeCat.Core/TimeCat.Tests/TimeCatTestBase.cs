using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using NUnit.Framework;
using TimeCat.Proto.Commons;

namespace TimeCat.Tests
{
    public abstract class TimeCatTestBase
    {
        protected DateTimeOffset offsetStart;
        protected DateTimeOffset offsetEnd;
        protected Dictionary<int, int> totalTimes;
        protected Dictionary<int, List<TimestampRange>> timelines;
        [OneTimeSetUp]
        public virtual async Task Setup()
        {
            await Dummies.Create(Path.GetTempFileName());
            offsetStart = Dummies.LogStartsAt;
            offsetEnd = Dummies.LogEndsAt;
            totalTimes = Dummies.TotalUseTimesPerApplications;
            timelines = Dummies.TimelinesPerApplications;
        }
    }
}