using SQLite;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using TimeCat.Core.Database.Models;

namespace TimeCat.Core.Database
{
    sealed class TimeCatDB : SQLiteDatabase
    {
        protected override void OnInitialize(SQLiteConnection connection)
        {
            connection.CreateTable<Category>();
            connection.CreateTable<Application>();
            connection.CreateTable<Activity>();
        }

        public async IAsyncEnumerable<Category> GetCategoryTree()
        {
            var categories = (await Connection.Table<Category>().ToArrayAsync())
                .GroupBy(c => c.CategoryId)
                .ToDictionary(g => g.Key ?? int.MinValue, g => g.ToList());

            if (categories.TryGetValue(int.MinValue, out List<Category> rootCategories))
            {
                foreach (Category category in rootCategories)
                {
                    await Task.Run(() => BuildTree(category));
                    yield return category;
                }
            }

            void BuildTree(Category node)
            {
                if (categories.TryGetValue(node.Id, out List<Category> subCategories))
                {
                    categories.Remove(node.Id);
                    node.Categories = new ReadOnlyCollection<Category>(subCategories);

                    foreach (Category subCategory in subCategories)
                        BuildTree(subCategory);
                }
            }
        }

        public IAsyncEnumerable<Application> GetApplications() => TableAsync<Application>();

        public IAsyncEnumerable<Activity> GetActivities() => TableAsync<Activity>();

        #region Singleton
        static TimeCatDB _instance;

        public static TimeCatDB Instance => _instance ?? (_instance = new TimeCatDB());

        private TimeCatDB()
        {
        }
        #endregion
    }
}
