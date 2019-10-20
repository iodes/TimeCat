// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var core_services_category_service_pb = require('../../core/services/category_service_pb.js');
var core_common_pb = require('../../core/common_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_CategoryCreateRequest(arg) {
  if (!(arg instanceof core_services_category_service_pb.CategoryCreateRequest)) {
    throw new Error('Expected argument of type CategoryCreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CategoryCreateRequest(buffer_arg) {
  return core_services_category_service_pb.CategoryCreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CategoryCreateResponse(arg) {
  if (!(arg instanceof core_services_category_service_pb.CategoryCreateResponse)) {
    throw new Error('Expected argument of type CategoryCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CategoryCreateResponse(buffer_arg) {
  return core_services_category_service_pb.CategoryCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CategoryDeleteRequest(arg) {
  if (!(arg instanceof core_services_category_service_pb.CategoryDeleteRequest)) {
    throw new Error('Expected argument of type CategoryDeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CategoryDeleteRequest(buffer_arg) {
  return core_services_category_service_pb.CategoryDeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CategoryListResponse(arg) {
  if (!(arg instanceof core_services_category_service_pb.CategoryListResponse)) {
    throw new Error('Expected argument of type CategoryListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CategoryListResponse(buffer_arg) {
  return core_services_category_service_pb.CategoryListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CategoryUpdateRequest(arg) {
  if (!(arg instanceof core_services_category_service_pb.CategoryUpdateRequest)) {
    throw new Error('Expected argument of type CategoryUpdateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CategoryUpdateRequest(buffer_arg) {
  return core_services_category_service_pb.CategoryUpdateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Empty(arg) {
  if (!(arg instanceof core_common_pb.Empty)) {
    throw new Error('Expected argument of type Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Empty(buffer_arg) {
  return core_common_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var RpcCategoryServiceService = exports.RpcCategoryServiceService = {
  getCategories: {
    path: '/RpcCategoryService/GetCategories',
    requestStream: false,
    responseStream: false,
    requestType: core_common_pb.Empty,
    responseType: core_services_category_service_pb.CategoryListResponse,
    requestSerialize: serialize_Empty,
    requestDeserialize: deserialize_Empty,
    responseSerialize: serialize_CategoryListResponse,
    responseDeserialize: deserialize_CategoryListResponse,
  },
  createCategory: {
    path: '/RpcCategoryService/CreateCategory',
    requestStream: false,
    responseStream: false,
    requestType: core_services_category_service_pb.CategoryCreateRequest,
    responseType: core_services_category_service_pb.CategoryCreateResponse,
    requestSerialize: serialize_CategoryCreateRequest,
    requestDeserialize: deserialize_CategoryCreateRequest,
    responseSerialize: serialize_CategoryCreateResponse,
    responseDeserialize: deserialize_CategoryCreateResponse,
  },
  updateCategory: {
    path: '/RpcCategoryService/UpdateCategory',
    requestStream: false,
    responseStream: false,
    requestType: core_services_category_service_pb.CategoryUpdateRequest,
    responseType: core_common_pb.Empty,
    requestSerialize: serialize_CategoryUpdateRequest,
    requestDeserialize: deserialize_CategoryUpdateRequest,
    responseSerialize: serialize_Empty,
    responseDeserialize: deserialize_Empty,
  },
  deleteCategory: {
    path: '/RpcCategoryService/DeleteCategory',
    requestStream: false,
    responseStream: false,
    requestType: core_services_category_service_pb.CategoryDeleteRequest,
    responseType: core_common_pb.Empty,
    requestSerialize: serialize_CategoryDeleteRequest,
    requestDeserialize: deserialize_CategoryDeleteRequest,
    responseSerialize: serialize_Empty,
    responseDeserialize: deserialize_Empty,
  },
};

exports.RpcCategoryServiceClient = grpc.makeGenericClientConstructor(RpcCategoryServiceService);
