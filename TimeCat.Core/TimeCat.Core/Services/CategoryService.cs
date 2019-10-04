using Grpc.Core;
using System;
using System.Threading.Tasks;
using TimeCat.Proto.Commons;
using TimeCat.Proto.Services;

namespace TimeCat.Core.Services
{
    class CategoryService : RpcCategoryService.RpcCategoryServiceBase
    {
        public override Task<CategoryListResponse> GetCategories(Empty request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }

        public override Task<CategoryCreateResponse> CreateCategory(CategoryCreateRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }

        public override Task<Empty> UpdateCategory(CategoryUpdateRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }

        public override Task<Empty> DeleteCategory(CategoryDeleteRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }
    }
}
