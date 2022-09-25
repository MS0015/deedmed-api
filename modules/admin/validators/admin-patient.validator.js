'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS, HTTP_CODES, GENDER, USER_TYPES } = require('../../../lib/constant.js');

const createSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  userType: Joi.string().valid(USER_TYPES.GUARDIAN, USER_TYPES.PATIENT).required(),
  phoneNumber: Joi.string().required(),
  name: Joi.string().required(),
  gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE).required(),
  district: Joi.string().required(),
  address: Joi.string().required(),
  dob: Joi.date().required(),
  longTermMedic: Joi.array().items(Joi.string()).min(1),
  allergies: Joi.array().items(Joi.string()).min(1),
});

class AdminPatientValidator {
  static createValidation(obj) {
    const { value, error } = createSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = AdminPatientValidator;
