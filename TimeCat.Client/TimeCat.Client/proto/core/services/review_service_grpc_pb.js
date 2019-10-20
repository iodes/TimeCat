// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var core_services_review_service_pb = require('../../core/services/review_service_pb.js');
var core_common_pb = require('../../core/common_pb.js');
var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_TimelineRequest(arg) {
  if (!(arg instanceof core_services_review_service_pb.TimelineRequest)) {
    throw new Error('Expected argument of type TimelineRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TimelineRequest(buffer_arg) {
  return core_services_review_service_pb.TimelineRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TimelineResponse(arg) {
  if (!(arg instanceof core_services_review_service_pb.TimelineResponse)) {
    throw new Error('Expected argument of type TimelineResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TimelineResponse(buffer_arg) {
  return core_services_review_service_pb.TimelineResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RpcReviewServiceService = exports.RpcReviewServiceService = {
  getTimeline: {
    path: '/RpcReviewService/GetTimeline',
    requestStream: false,
    responseStream: true,
    requestType: core_services_review_service_pb.TimelineRequest,
    responseType: core_services_review_service_pb.TimelineResponse,
    requestSerialize: serialize_TimelineRequest,
    requestDeserialize: deserialize_TimelineRequest,
    responseSerialize: serialize_TimelineResponse,
    responseDeserialize: deserialize_TimelineResponse,
  },
};

exports.RpcReviewServiceClient = grpc.makeGenericClientConstructor(RpcReviewServiceService);
