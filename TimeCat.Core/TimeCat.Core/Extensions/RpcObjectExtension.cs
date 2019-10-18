using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using TimeCat.Core.Database.Models;
using TimeCat.Proto.Commons;

namespace TimeCat.Core.Extensions
{
    internal static class RpcObjectExtension
    {
        #region RpcCategory
        public static RpcCategory ToRpc(this Category category)
        {
            var rpcCategory = new RpcCategory
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
            var rpcApplication = new RpcApplication
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
            var category = new Category
            {
                Id = rpcCategory.Id,
                Name = rpcCategory.Name,
                Color = ColorTranslator.FromHtml(rpcCategory.Color)
            };

            if (rpcCategory.Categories?.Count > 0)
            {
                List<Category> categoryList = rpcCategory.Categories
                    .Select(FromRpc)
                    .ToList();

                category.Categories = new ReadOnlyCollection<Category>(categoryList);
            }

            return category;
        }
        #endregion

        #region RpcOSPlatform
        public static RpcOSPlatform ToRpc(this OSPlatform platform)
        {
            if (platform == OSPlatform.Windows)
                return RpcOSPlatform.Windows;

            if (platform == OSPlatform.OSX)
                return RpcOSPlatform.Osx;

            if (platform == OSPlatform.Linux)
                return RpcOSPlatform.Linux;

            if (platform == OSPlatform.FreeBSD)
                return RpcOSPlatform.FreeBsd;

            throw new InvalidOperationException();
        }

        public static OSPlatform FromRpc(this RpcOSPlatform platform)
        {
            return platform switch
            {
                RpcOSPlatform.Windows => OSPlatform.Windows,
                RpcOSPlatform.Osx => OSPlatform.OSX,
                RpcOSPlatform.Linux => OSPlatform.Linux,
                RpcOSPlatform.FreeBsd => OSPlatform.FreeBSD,
                _ => throw new InvalidOperationException()
            };
        }
        #endregion

        #region RpcOSArchitecture
        public static RpcOSArchitecture ToRpc(this Architecture architecture)
        {
            return architecture switch
            {
                Architecture.X86 => RpcOSArchitecture.X86,
                Architecture.X64 => RpcOSArchitecture.X64,
                Architecture.Arm => RpcOSArchitecture.Arm,
                Architecture.Arm64 => RpcOSArchitecture.Arm64,
                _ => throw new InvalidOperationException()
            };
        }

        public static Architecture FromRpc(this RpcOSArchitecture platform)
        {
            return platform switch
            {
                RpcOSArchitecture.X86 => Architecture.X86,
                RpcOSArchitecture.X64 => Architecture.X64,
                RpcOSArchitecture.Arm => Architecture.Arm,
                RpcOSArchitecture.Arm64 => Architecture.Arm64,
                _ => throw new InvalidOperationException()
            };
        }
        #endregion
    }
}
