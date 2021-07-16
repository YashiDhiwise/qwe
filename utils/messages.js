const responseStatusCode = require('./responseCode');

exports.successResponse = (data, res) => res.status(responseStatusCode.success).json({
  STATUS: 'Success',
  MESSAGE: 'Your request is successfully executed',
  DATA: data,
});

exports.failureResponse = (data, res) => res.status(responseStatusCode.internalServerError).json({
  STATUS: 'Failure',
  MESSAGE: 'Internal Server Error',
  DATA: data,
});

exports.badRequest = (data, res) => res.status(responseStatusCode.badRequest).json({
  STATUS: 'Bad Request',
  MESSAGE: 'The request cannot be fulfilled due to bad syntax',
  DATA: data,
});

exports.validationError = (data, res) => res.status(responseStatusCode.validationError).json({
  STATUS: 'Validation Error',
  MESSAGE: 'Invalid Data, Validation Failed',
  DATA: data,
});

exports.isDuplicate = (data, res) => res.status(responseStatusCode.validationError).json({
  STATUS: 'Validation Error',
  MESSAGE: 'Data Duplication Found',
  DATA: data,
});

exports.recordNotFound = (data, res) => res.status(responseStatusCode.success).json({
  STATUS: 'Success',
  MESSAGE: 'Record not found with specified criteria.',
  DATA: data,
});

exports.insufficientParameters = (res) => res.status(responseStatusCode.badRequest).json({
  STATUS: 'FAILURE',
  MESSAGE: 'Insufficient parameters',
  DATA: {}
});

exports.notFound = (err, res) => res.status(responseStatusCode.notFound).json({
  STATUS: 'Not Found',
  MESSAGE: 'The requested resource could not be found but may be available again in the future',
  DATA: {}
});

exports.mongoError = (err, res) => res.status(responseStatusCode.internalServerError).json({
  STATUS: 'Failure',
  MESSAGE: 'Mongo db related error',
  DATA: err,
});

exports.inValidParam = (err, res) => res.status(responseStatusCode.validationError).json({
  STATUS: 'Validation Error',
  MESSAGE: 'Invalid values in parameters',
  DATA: err,
});

exports.unAuthorizedRequest = (err, res) => res.status(responseStatusCode.unAuthorizedRequest).json({
  STATUS: 'Unauthorized',
  MESSAGE: 'You are not authorized to access the request',
  ERROR: err,
});

exports.loginSuccess = (data, res) => res.status(responseStatusCode.success).json({
  STATUS: 'Success',
  MESSAGE: 'Login Successful',
  DATA: data,
});

exports.passwordEmailWrong = (res) => res.status(responseStatusCode.unAuthorizedRequest).json({
  STATUS: 'Unauthorized',
  MESSAGE: 'email or password may be wrong',
  DATA: {},
});
exports.loginFailed = (data, res) => res.status(responseStatusCode.unAuthorizedRequest).json({
  STATUS: 'Unauthorized',
  MESSAGE: 'Login Failed',
  DATA: data,
});
exports.failedSoftDelete = (res) => res.status(responseStatusCode.internalServerError).json({
  STATUS: 'Failure',
  MESSAGE: 'Data can not be deleted due to internal server error',
  DATA: {},
});
