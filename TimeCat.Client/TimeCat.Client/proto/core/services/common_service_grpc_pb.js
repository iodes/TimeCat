// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var core_services_common_service_pb = require('../../core/services/common_service_pb.js');
var core_common_pb = require('../../core/common_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_HealthCheckRequest(arg) {
  if (!(arg instanceof core_services_common_service_pb.HealthCheckRequest)) {
    throw new Error('Expected argument of type HealthCheckRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_HealthCheckRequest(buffer_arg) {
  return core_services_common_service_pb.HealthCheckRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_HealthCheckResponse(arg) {
  if (!(arg instanceof core_services_common_service_pb.HealthCheckResponse)) {
    throw new Error('Expected argument of type HealthCheckResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_HealthCheckResponse(buffer_arg) {
  return core_services_common_service_pb.HealthCheckResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_InitializeRequest(arg) {
  if (!(arg instanceof core_services_common_service_pb.InitializeRequest)) {
    throw new Error('Expected argument of type InitializeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_InitializeRequest(buffer_arg) {
  return core_services_common_service_pb.InitializeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_InitializeResponse(arg) {
  if (!(arg instanceof core_services_common_service_pb.InitializeResponse)) {
    throw new Error('Expected argument of type InitializeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_InitializeResponse(buffer_arg) {
  return core_services_common_service_pb.InitializeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RpcCommonServiceService = exports.RpcCommonServiceService = {
  initialize: {
    path: '/RpcCommonService/Initialize',
    requestStream: false,
    responseStream: false,
    requestType: core_services_common_service_pb.InitializeRequest,
    responseType: core_services_common_service_pb.InitializeResponse,
    requestSerialize: serialize_InitializeRequest,
    requestDeserialize: deserialize_InitializeRequest,
    responseSerialize: serialize_InitializeResponse,
    responseDeserialize: deserialize_InitializeResponse,
  },
  healthCheck: {
    path: '/RpcCommonService/HealthCheck',
    requestStream: false,
    responseStream: false,
    requestType: core_services_common_service_pb.HealthCheckRequest,
    responseType: core_services_common_service_pb.HealthCheckResponse,
    requestSerialize: serialize_HealthCheckRequest,
    requestDeserialize: deserialize_HealthCheckRequest,
    responseSerialize: serialize_HealthCheckResponse,
    responseDeserialize: deserialize_HealthCheckResponse,
  },
};

exports.RpcCommonServiceClient = grpc.makeGenericClientConstructor(RpcCommonServiceService);
