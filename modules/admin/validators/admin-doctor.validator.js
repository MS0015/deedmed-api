'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS, HTTP_CODES, GENDER, SERVICE_AREAS_DOCTOR } = require('../../../lib/constant.js');

const createSchema = Joi.object().keys({
  name: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  district: Joi.string().required(),
  experienceYears: Joi.number().required(),
  regNo: Joi.string().required(),
  serviceCategories: Joi.array().items(Joi.string()).min(1).required(),
  privateClinicAddress: Joi.string().required(),
  qualifications: Joi.array().items(Joi.string()).min(1).required(),
  memberships: Joi.array().items(Joi.string()).required(),
  serviceAreas: Joi.array().items(Joi.string().valid(SERVICE_AREAS_DOCTOR.ONLINE, SERVICE_AREAS_DOCTOR.PRIVATE_CLINIC, SERVICE_AREAS_DOCTOR.HOME_VISITING)).min(1).required(),
  telephoneNumber: Joi.string(),
  languages: Joi.array().items(Joi.string()).min(1).required(),
  bankAccountHolderName: Joi.string(),
  bankName: Joi.string(),
  bankBranch: Joi.string(),
  bankAccountNumber: Joi.string(),
});

class AdminDoctorValidator {
  static createValidation(obj) {
    const { value, error } = createSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = AdminDoctorValidator;
