'use strict';
const Joi = require('joi');
const CustomHttpError = require('../custom-http-error');
const { HTTP_CODES, ERRORS, TIME_FILTER } = require('../constant.js');

const schemaOffsetLimit = Joi.object().keys({
  offset: Joi.number().default(0),
  limit: Joi.number().default(10)
});

const schemaOffsetLimitTimeFilter = Joi.object().keys({
  offset: Joi.number().default(0),
  limit: Joi.number().default(10),
  timeFilter: Joi.string().valid(TIME_FILTER.ALL, TIME_FILTER.FUTURE, TIME_FILTER.PRESENT, TIME_FILTER.PAST).default(TIME_FILTER.ALL),
});

class CommonValidator {

  static isValidOffsetLimit(obj) {
    let { value, error } = schemaOffsetLimit.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static isValidOffsetLimitTimeFilter(obj) {
    let { value, error } = schemaOffsetLimitTimeFilter.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = CommonValidator;
