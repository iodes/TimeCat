using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using SQLite;
using TimeCat.Core.Database.Models;
using TimeCat.Core.Driver;

namespace TimeCat.Core.Database
{
    internal sealed class TimeCatDB : SQLiteDatabase
    {
        protected override void OnInitialize(SQLiteConnection connection)
        {
            connection.CreateTable<Category>();
            connection.CreateTable<Application>();
            connection.CreateTable<Activity>();
        }

        public async IAsyncEnumerable<Category> GetCategoryTree()
        {
            Dictionary<int, List<Category>> categories = (await Connection.Table<Category>().ToArrayAsync())
                .GroupBy(c => c.CategoryId)
                .ToDictionary(g => g.Key ?? int.MinValue, g => g.ToList());

            if (categories.TryGetValue(int.MinValue, out List<Category> rootCategories))
                foreach (var category in rootCategories)
                {
                    await Task.Run(() => BuildTree(category));
                    yield return category;
                }

            void BuildTree(Category node)
            {
                if (categories.TryGetValue(node.Id, out List<Category> subCategories))
                {
                    categories.Remove(node.Id);
                    node.Categories = new ReadOnlyCollection<Category>(subCategories);

                    foreach (var subCategory in subCategories)
                        BuildTree(subCategory);
                }
            }
        }

        public IAsyncEnumerable<Application> GetApplications()
        {
            return TableAsync<Application>();
        }

        public IAsyncEnumerable<Activity> GetActivities()
        {
            return TableAsync<Activity>();
        }

        #region Singleton
        private static TimeCatDB _instance;

        public static TimeCatDB Instance => _instance ?? (_instance = new TimeCatDB());

        private TimeCatDB()
        {
        }
        #endregion
    }
}
