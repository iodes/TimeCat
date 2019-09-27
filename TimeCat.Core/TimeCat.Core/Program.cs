using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;

namespace TimeCat.Core
{
    class Program
    {
        static async Task Main(string[] args)
        {
            await TimeCatDB.Instance.Initialize(Environment.Database);

            await TimeCatDB.Instance.DeleteAllAsync<Category>();
            await TimeCatDB.Instance.DeleteAllAsync<Application>();
            await TimeCatDB.Instance.DeleteAllAsync<Activity>();

            var categories = Enumerable.Range(0, 100)
                .Select(i => new Category() { Name = $"Category {i}" });

            await TimeCatDB.Instance.InsertRangeAsync(categories);

            var applications = new List<Application>();

            await foreach (Category c in TimeCatDB.Instance.GetCategories())
            {
                applications.Add(new Application()
                {
                    Name = $"Test Application ({c.Id})",
                    FullName = $"TimeCat.Core.Test.Application_{c.Id}",
                    Version = $"1.0.0.{c.Id}",
                    Icon = "C:\\icon.png",
                    CategoryId = c.Id
                });
            }

            await TimeCatDB.Instance.InsertRangeAsync(applications);

            await foreach (Application app in TimeCatDB.Instance.GetApplications())
            {
                Console.WriteLine($"App: {app.Id}, {app.Name}({app.Version})");
            }
        }
    }
}
