'use strict';
const Joi = require('joi');

const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS, HTTP_CODES } = require('../../../lib/constant.js');

const createSchema = Joi.object().keys({
    group: Joi.string().required(),
    template: Joi.string().required(),
    params: Joi.object().required(),
    mobile: Joi.string().required(),
    email: Joi.string().required(),
    deviceId: Joi.string().required(),
  });
  
  class NotificationValidator {
    static createValidation(obj) {
      const { value, error } = createSchema.validate(obj);
      if (error) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
      }
      return Promise.resolve(value);
    }
  }
  
  module.exports = NotificationValidator;
  