// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var common_pb = require('./common_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_common_Void(arg) {
  if (!(arg instanceof common_pb.Void)) {
    throw new Error('Expected argument of type common.Void');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_common_Void(buffer_arg) {
  return common_pb.Void.deserializeBinary(new Uint8Array(buffer_arg));
}


var CommonServiceService = exports.CommonServiceService = {
  initialize: {
    path: '/common.CommonService/initialize',
    requestStream: false,
    responseStream: false,
    requestType: common_pb.Void,
    responseType: common_pb.Void,
    requestSerialize: serialize_common_Void,
    requestDeserialize: deserialize_common_Void,
    responseSerialize: serialize_common_Void,
    responseDeserialize: deserialize_common_Void,
  },
  // void initialize (Request) returns (Response);
};

exports.CommonServiceClient = grpc.makeGenericClientConstructor(CommonServiceService);
