// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var core_services_main_service_pb = require('../../core/services/main_service_pb.js');
var core_common_pb = require('../../core/common_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_DateRangeRequest(arg) {
  if (!(arg instanceof core_services_main_service_pb.DateRangeRequest)) {
    throw new Error('Expected argument of type DateRangeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DateRangeRequest(buffer_arg) {
  return core_services_main_service_pb.DateRangeRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_SearchRequest(arg) {
  if (!(arg instanceof core_services_main_service_pb.SearchRequest)) {
    throw new Error('Expected argument of type SearchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SearchRequest(buffer_arg) {
  return core_services_main_service_pb.SearchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SearchResponse(arg) {
  if (!(arg instanceof core_services_main_service_pb.SearchResponse)) {
    throw new Error('Expected argument of type SearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SearchResponse(buffer_arg) {
  return core_services_main_service_pb.SearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RpcMainServiceService = exports.RpcMainServiceService = {
  setDateRange: {
    path: '/RpcMainService/SetDateRange',
    requestStream: false,
    responseStream: false,
    requestType: core_services_main_service_pb.DateRangeRequest,
    responseType: core_common_pb.Empty,
    requestSerialize: serialize_DateRangeRequest,
    requestDeserialize: deserialize_DateRangeRequest,
    responseSerialize: serialize_Empty,
    responseDeserialize: deserialize_Empty,
  },
  search: {
    path: '/RpcMainService/Search',
    requestStream: false,
    responseStream: false,
    requestType: core_services_main_service_pb.SearchRequest,
    responseType: core_services_main_service_pb.SearchResponse,
    requestSerialize: serialize_SearchRequest,
    requestDeserialize: deserialize_SearchRequest,
    responseSerialize: serialize_SearchResponse,
    responseDeserialize: deserialize_SearchResponse,
  },
};

exports.RpcMainServiceClient = grpc.makeGenericClientConstructor(RpcMainServiceService);
