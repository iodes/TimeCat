using SQLite;
using System.Collections.Generic;
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

        public IAsyncEnumerable<Category> GetCategories() => TableAsync<Category>();

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
