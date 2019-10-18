// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var core_services_dashboard_service_pb = require('../../core/services/dashboard_service_pb.js');
var core_common_pb = require('../../core/common_pb.js');
var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_ApplicationRequest(arg) {
  if (!(arg instanceof core_services_dashboard_service_pb.ApplicationRequest)) {
    throw new Error('Expected argument of type ApplicationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ApplicationRequest(buffer_arg) {
  return core_services_dashboard_service_pb.ApplicationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ApplicationResponse(arg) {
  if (!(arg instanceof core_services_dashboard_service_pb.ApplicationResponse)) {
    throw new Error('Expected argument of type ApplicationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ApplicationResponse(buffer_arg) {
  return core_services_dashboard_service_pb.ApplicationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TotalTimeRequest(arg) {
  if (!(arg instanceof core_services_dashboard_service_pb.TotalTimeRequest)) {
    throw new Error('Expected argument of type TotalTimeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TotalTimeRequest(buffer_arg) {
  return core_services_dashboard_service_pb.TotalTimeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TotalTimeResponse(arg) {
  if (!(arg instanceof core_services_dashboard_service_pb.TotalTimeResponse)) {
    throw new Error('Expected argument of type TotalTimeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TotalTimeResponse(buffer_arg) {
  return core_services_dashboard_service_pb.TotalTimeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RpcDashboardServiceService = exports.RpcDashboardServiceService = {
  getTotalTime: {
    path: '/RpcDashboardService/GetTotalTime',
    requestStream: false,
    responseStream: false,
    requestType: core_services_dashboard_service_pb.TotalTimeRequest,
    responseType: core_services_dashboard_service_pb.TotalTimeResponse,
    requestSerialize: serialize_TotalTimeRequest,
    requestDeserialize: deserialize_TotalTimeRequest,
    responseSerialize: serialize_TotalTimeResponse,
    responseDeserialize: deserialize_TotalTimeResponse,
  },
  getApplications: {
    path: '/RpcDashboardService/GetApplications',
    requestStream: false,
    responseStream: true,
    requestType: core_services_dashboard_service_pb.ApplicationRequest,
    responseType: core_services_dashboard_service_pb.ApplicationResponse,
    requestSerialize: serialize_ApplicationRequest,
    requestDeserialize: deserialize_ApplicationRequest,
    responseSerialize: serialize_ApplicationResponse,
    responseDeserialize: deserialize_ApplicationResponse,
  },
};

exports.RpcDashboardServiceClient = grpc.makeGenericClientConstructor(RpcDashboardServiceService);
