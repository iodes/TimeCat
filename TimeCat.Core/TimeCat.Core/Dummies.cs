using System;
using System.Drawing;
using System.Threading.Tasks;
using TimeCat.Core.Commons;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;

namespace TimeCat.Core
{
    internal static class Dummies
    {
        private static T RandomEnumValue<T>()
        {
            var v = Enum.GetValues(typeof(T));
            return (T)v.GetValue(new Random().Next(v.Length));
        }

        private static async Task InsertDummies(DateTimeOffset start)
        {
            var rnd = new Random();

            const int applicationCount = 30;
            const int subCategoriesCount = 5;
            const int categoriesCount = 5;

            await TimeCatDB.Instance.TransactionAsync(async s =>
            {
                // 카테고리와 어플리케이션 무작위 생성
                for (int i = 0; i < categoriesCount; i++)
                    await TimeCatDB.Instance.InsertAsync(new Category
                    {
                        Id = i + 1,
                        Name = $"Awesome Category {i}",
                        Color = Color.FromKnownColor(RandomEnumValue<KnownColor>())
                    });

                for (int i = 0; i < subCategoriesCount; i++)
                    await TimeCatDB.Instance.InsertAsync(new Category
                    {
                        Id = i + categoriesCount + 1,
                        CategoryId = rnd.Next(categoriesCount) + 1,
                        Name = $"Awesome Category {i}",
                        Color = Color.FromKnownColor(RandomEnumValue<KnownColor>())
                    });

                for (int i = 0; i < applicationCount; i++)
                    await TimeCatDB.Instance.InsertAsync(new Application
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
                    await TimeCatDB.Instance.InsertAsync(new Activity
                    {
                        Id = logIndex++,
                        ApplicationId = i,
                        Action = ActionType.Open,
                        Time = lastTime
                    });

                    for (int j = 0; j < rnd.Next(1, 200); j++)
                    {
                        // - FOCUS
                        await TimeCatDB.Instance.InsertAsync(new Activity
                        {
                            Id = logIndex++,
                            ApplicationId = i,
                            Action = ActionType.Focus,
                            Time = lastTime
                        });

                        // - BLUR
                        lastTime = lastTime.AddMinutes(rnd.Next(1, 10));
                        await TimeCatDB.Instance.InsertAsync(new Activity
                        {
                            Id = logIndex++,
                            ApplicationId = i,
                            Action = ActionType.Blur,
                            Time = lastTime
                        });
                    }

                    // - CLOSE
                    lastTime = lastTime.AddMinutes(rnd.Next(1, 10));
                    await TimeCatDB.Instance.InsertAsync(new Activity
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
            await InsertDummies(DateTimeOffset.UtcNow - new TimeSpan(30, 0, 0, 0));
        }
    }
}
