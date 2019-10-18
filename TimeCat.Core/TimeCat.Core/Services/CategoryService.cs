using System;
using System.Drawing;
using System.Threading.Tasks;
using Grpc.Core;
using TimeCat.Core.Database;
using TimeCat.Core.Database.Models;
using TimeCat.Core.Extensions;
using TimeCat.Proto.Commons;
using TimeCat.Proto.Services;

namespace TimeCat.Core.Services
{
    internal class CategoryService : RpcCategoryService.RpcCategoryServiceBase
    {
        private readonly TimeCatDB _db = TimeCatDB.Instance;

        public override async Task<CategoryListResponse> GetCategories(Empty request, ServerCallContext context)
        {
            var response = new CategoryListResponse();

            await foreach (var category in _db.GetCategoryTree())
                response.Categories.Add(category.ToRpc());

            return response;
        }

        public override async Task<CategoryCreateResponse> CreateCategory(CategoryCreateRequest request, ServerCallContext context)
        {
            var category = new Category
            {
                Name = request.Name,
                Color = ColorTranslator.FromHtml(request.Color),
                CategoryId = request.ParentId
            };

            if (await _db.InsertAsync(category) == false)
                throw new Exception("Couldn't insert category");

            var rowId = _db.LastInsertRowId();

            return new CategoryCreateResponse
            {
                Category = (await _db.GetAsync<Category>(rowId)).ToRpc()
            };
        }

        public override async Task<Empty> UpdateCategory(CategoryUpdateRequest request, ServerCallContext context)
        {
            var category = await _db.GetAsync<Category>(request.Id);

            if (category == null)
                throw new Exception($"{request.Id} category not found");

            if (!string.IsNullOrEmpty(request.Name))
                category.Name = request.Name;

            if (!string.IsNullOrEmpty(request.Color))
                category.Color = ColorTranslator.FromHtml(request.Color);

            if (request.ParentId.HasValue())
                category.CategoryId = request.ParentId;

            await _db.UpdateAsync(category);

            return new Empty();
        }

        public override async Task<Empty> DeleteCategory(CategoryDeleteRequest request, ServerCallContext context)
        {
            await _db.DeleteAsync<Category>(request.Id);
            return new Empty();
        }

        public override async Task<Empty> MoveApplication(ApplicationMoveRequest request, ServerCallContext context)
        {
            var application = await _db.GetAsync<Application>(request.ApplicationId);
         
            if (application == null)
                throw new Exception($"{request.ApplicationId} application not found");

            if (await _db.HasKeyAsync<Category>(request.CategoryId) == false)
                throw new Exception($"{request.CategoryId} category not found");

            if (application.CategoryId != request.CategoryId)
            {
                application.CategoryId = request.CategoryId;
                await _db.UpdateAsync(application);   
            }

            return new Empty();
        }
    }
}
