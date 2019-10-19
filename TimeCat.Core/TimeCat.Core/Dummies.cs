using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using TimeCat.Core.Commons;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;
using TimeCat.Proto.Commons;

namespace TimeCat.Core
{
    static class Dummies
    {
        private static Dictionary<int, int> totalTimes;
        private static Dictionary<int, List<TimestampRange>> timeRanges;
        private static DateTimeOffset offsetStart;
        private static DateTimeOffset offsetEnd;
        private static bool dummiesGenerated = false;
        
        private static async Task InsertDummies(DateTimeOffset start)
        {
            totalTimes = new Dictionary<int, int>();
            timeRanges = new Dictionary<int, List<TimestampRange>>();
            TimeSpan unitSpan = new TimeSpan(0, 0, 0, 1);
            Random rnd = new Random();

            int applicationCount = 30;
            int categoriesCount = 5, subCategoriesCount = 5;

            await TimeCatDB.Instance.TransactionAsync(async (s) =>
            {
                // 카테고리와 어플리케이션 무작위 생성
                for (int i = 0; i < categoriesCount; i++)
                    await TimeCatDB.Instance.InsertAsync(new Category() 
                    {
                        Id = i + 1,
                        Name = $"Awesome Category {i}",
                        Color = Color.Blue
                    });

                for (int i = 0; i < subCategoriesCount; i++)
                    await TimeCatDB.Instance.InsertAsync(new Category() 
                    {
                        Id = i + categoriesCount + 1,
                        CategoryId = rnd.Next(categoriesCount) + 1,
                        Name = $"Awesome Category {i}",
                        Color = Color.Aqua 
                    });

                for (int i = 0; i < applicationCount; i++)
                    await TimeCatDB.Instance.InsertAsync(new Application() 
                    { 
                        CategoryId = rnd.Next(categoriesCount) + 1, 
                        FullName = $"C:\\TestApp{i}.exe", Id = i + 1, 
                        IsProductivity = rnd.Next(100) % 2 == 0, 
                        Name = $"Test Application {i}", 
                        Icon = "chrome", 
                        Version = "1.0" 
                    });

                // Activity 생성
                int logIndex = 0;
                for (int i = 1; i <= applicationCount; i++)
                {
                    var lastTime = start.AddMinutes(rnd.Next(0, 43200));

                    // - OPEN
                    await TimeCatDB.Instance.InsertAsync(new Activity()
                    {
                        Id = logIndex++,
                        ApplicationId = i,
                        Action = ActionType.Open,
                        Time = lastTime
                    });

                    for (int j = 0; j < rnd.Next(1, 200); j++)
                    {
                        // - FOCUS
                        await TimeCatDB.Instance.InsertAsync(new Activity()
                        {
                            Id = logIndex++,
                            ApplicationId = i,
                            Action = ActionType.Focus,
                            Time = lastTime
                        });

                        // - BLUR
                        lastTime = lastTime.AddMinutes(rnd.Next(1, 10));
                        await TimeCatDB.Instance.InsertAsync(new Activity()
                        {
                            Id = logIndex++,
                            ApplicationId = i,
                            Action = ActionType.Blur,
                            Time = lastTime
                        });
                    }

                    // - CLOSE
                    lastTime = lastTime.AddMinutes(rnd.Next(1, 10));
                    await TimeCatDB.Instance.InsertAsync(new Activity()
                    {
                        Id = logIndex++,
                        ApplicationId = i,
                        Action = ActionType.Close,
                        Time = lastTime
                    });
                }
            });
        }

        public static async Task Create()
        {
            if (dummiesGenerated)
                return;
            dummiesGenerated = true;

            // insert dummies
            offsetStart = DateTimeOffset.UtcNow - new TimeSpan(30,0,0,0);
            await InsertDummies(offsetStart);
        }

        public static Dictionary<int, int> TotalUseTimesPerApplications => totalTimes;

        public static Dictionary<int, List<TimestampRange>> TimelinesPerApplications => timeRanges;
        
        public static DateTimeOffset LogStartsAt => offsetStart;
        
        public static DateTimeOffset LogEndsAt => offsetEnd;
    }
}
