using SQLite;
using SQLiteNetExtensionsAsync.Extensions;
using System.Collections.Generic;
using System.Reflection;
using TimeCat.Core.Database.Models;

namespace TimeCat.Core.Database
{
    sealed class TimeCatDB : SQLiteDatabase
    {
        static readonly PropertyInfo _applicationCategoryProperty;

        static TimeCatDB()
        {
            _applicationCategoryProperty = typeof(Application).GetRuntimeProperty(nameof(Application.Category));
        }

        protected override void OnInitialize(SQLiteConnection connection)
        {
            connection.CreateTable<Category>();
            connection.CreateTable<Application>();
            //connection.CreateTable<Activity>();
        }

        public IAsyncEnumerable<Category> GetCategories() => TableAsync<Category>();

        public async IAsyncEnumerable<Application> GetApplications()
        {
            await foreach (var application in TableAsync<Application>())
            {
                await ReadOperations.GetChildAsync(Connection, application, _applicationCategoryProperty);
                yield return application;
            }
        }

        #region Singleton
        static TimeCatDB _instance;

        public static TimeCatDB Instance => _instance ?? (_instance = new TimeCatDB());

        private TimeCatDB()
        {
        }
        #endregion
    }
}
