using SQLite;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace TimeCat.Core.Database
{
    public abstract class SQLiteDatabase
    {
        protected SQLiteAsyncConnection Connection { get; private set; }

        public async Task Initialize(string dbFile, string key = null)
        {
            if (Connection != null)
                return;

            string directory = Path.GetDirectoryName(dbFile);

            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);

            Connection = new SQLiteAsyncConnection(new SQLiteConnectionString(dbFile, true, key));
            
            await TransactionAsync(OnInitialize);
        }

        protected abstract void OnInitialize(SQLiteConnection connection);

        public async IAsyncEnumerable<T> TableAsync<T>() where T : new()
        {
            foreach (T item in await Connection.Table<T>().ToArrayAsync())
            {
                yield return item;
            }
        }

        public async IAsyncEnumerable<T> TableAsync<T>(Expression<Func<T, bool>> expression) where T : new()
        {
            foreach (T item in await Connection.Table<T>().Where(expression).ToArrayAsync())
            {
                yield return item;
            }
        }

        public Task<T> GetAsync<T>(object pk) where T : new()
        {
            return Connection.GetAsync<T>(pk);
        }
        
        public Task<T> GetAsync<T>(Expression<Func<T, bool>> predicate) where T : new()
        {
            return Connection.GetAsync(predicate);
        }
        
        public Task<object> GetAsync(object pk, TableMapping map)
        {
            return Connection.GetAsync(pk, map);
        }

        public async Task<bool> InsertAsync(object item)
        {
            return await Connection.InsertAsync(item) > 0;
        }

        public async Task<bool> InsertRangeAsync(IEnumerable<object> items)
        {
            return await Connection.InsertAllAsync(items) > 0;
        }

        public async Task<bool> UpdateAsync(object item)
        {
            return await Connection.UpdateAsync(item) > 0;
        }

        public async Task<bool> UpdateRangeAsync(IEnumerable<object> items)
        {
            return await Connection.UpdateAllAsync(items) > 0;
        }

        public async Task<bool> DeleteAllAsync<T>() where T : new()
        {
            return await Connection.DeleteAllAsync<T>() > 0;
        }

        public async Task<bool> DeleteAsync(object item)
        {
            return await Connection.DeleteAsync(item) > 0;
        }

        public async Task<bool> DeleteRangeAsync(IEnumerable<object> items)
        {
            var results = await Task.WhenAll(items.Select(async item => await Connection.DeleteAsync(item)));
            return results.All(r => r > 0);
        }

        public Task TransactionAsync(Action<SQLiteConnection> action)
        {
            if (action == null)
                throw new ArgumentNullException(nameof(action));

            lock (Connection)
            {
                return Connection.RunInTransactionAsync(action);
            }
        }
    }
}
