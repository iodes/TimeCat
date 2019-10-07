using System.Collections.ObjectModel;
using System.Drawing;
using System.Linq;
using TimeCat.Core.Database.Models;
using TimeCat.Proto.Commons;

namespace TimeCat.Core.Extensions
{
    static class RpcObjectExtension
    {
        #region RpcCategory
        public static RpcCategory ToRpc(this Category category)
        {
            var rpcCategory = new RpcCategory()
            {
                Id = category.Id,
                Name = category.Name,
                Color = ColorTranslator.ToHtml(category.Color)
            };

            if (category.Categories?.Count > 0)
                rpcCategory.Categories.AddRange(category.Categories.Select(ToRpc));

            return rpcCategory;
        }
        
        public static RpcApplication ToRpc(this Application application)
        {
            var rpcApplication = new RpcApplication()
            {
                CategoryId = application.CategoryId,
                FullName = application.FullName,
                Icon = application.Icon,
                Id = application.Id,
                IsProductivity = application.IsProductivity,
                Name = application.Name,
                Version = application.Version
            };

            return rpcApplication;
        }

        public static Category FromRpc(this RpcCategory rpcCategory)
        {
            var category = new Category()
            {
                Id = rpcCategory.Id,
                Name = rpcCategory.Name,
                Color = ColorTranslator.FromHtml(rpcCategory.Color)
            };

            if (rpcCategory.Categories?.Count > 0)
            {
                var categoryList = rpcCategory.Categories
                    .Select(FromRpc)
                    .ToList();

                category.Categories = new ReadOnlyCollection<Category>(categoryList);
            }

            return category;
        }
        #endregion
    }
}
