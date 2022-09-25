'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { USER_TYPES, GENDER, ERRORS, HTTP_CODES, SERVICE_AREAS_DOCTOR } = require('../../../lib/constant.js');
const { AUTH_PROVIDER } = require('../../../lib/constant');

const signUpSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  authProvider: Joi.string().valid(AUTH_PROVIDER.EMAIL_PASSWORD, AUTH_PROVIDER.GOOGLE, AUTH_PROVIDER.FACEBOOK).required(),
  password: Joi.alternatives().conditional('authProvider', {
    is: AUTH_PROVIDER.EMAIL_PASSWORD,
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  phoneNumber: Joi.string().required(),
  userType: Joi.string().valid(USER_TYPES.DOCTOR).required(),
  name: Joi.string().required(),
  gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE).required(),
  district: Joi.string().required(),
  privateClinicAddress: Joi.string(),
  telephoneNumber: Joi.string(),
  languages: Joi.array().items(Joi.string()).min(1).required(),
  serviceCategories: Joi.array().items(Joi.string()).min(1).required(),
  regNo: Joi.string().required(),
  experienceYears: Joi.number().required(),
  serviceAreas: Joi.array().items(Joi.string().valid(SERVICE_AREAS_DOCTOR.ONLINE, SERVICE_AREAS_DOCTOR.PRIVATE_CLINIC, SERVICE_AREAS_DOCTOR.HOME_VISITING)).min(1).required(),
  qualifications: Joi.array().items(Joi.string()).min(1).required(),
  memberships: Joi.array().items(Joi.string()).required(),
  otp: Joi.number().required(),
  dob: Joi.date().required(),
});

const updateProfileSchema = Joi.object().keys({
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  name: Joi.string(),
  gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE),
  district: Joi.string(),
  privateClinicAddress: Joi.string(),
  telephoneNumber: Joi.string(),
  languages: Joi.array().items(Joi.string()).min(1),
  serviceCategories: Joi.array().items(Joi.string()).min(1),
  regNo: Joi.string(),
  experienceYears: Joi.number(),
  serviceAreas: Joi.array().items(Joi.string().valid(SERVICE_AREAS_DOCTOR.ONLINE, SERVICE_AREAS_DOCTOR.PRIVATE_CLINIC, SERVICE_AREAS_DOCTOR.HOME_VISITING)).min(1),
  qualifications: Joi.array().items(Joi.string()).min(1),
  memberships: Joi.array().items(Joi.string()),
  profileDescription: Joi.string(),
  bankAccountHolderName: Joi.string(),
  bankName: Joi.string(),
  bankBranch: Joi.string(),
  bankAccountNumber: Joi.string(),
  consultationFee: Joi.number(),
  displayingFee: Joi.number(),
  locationLat: Joi.number().min(-90).max(90),
  locationLong: Joi.number().min(-180).max(180),
  dob: Joi.date(),
});

const validateExistingDoctorsSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  authProvider: Joi.string().valid(AUTH_PROVIDER.EMAIL_PASSWORD, AUTH_PROVIDER.GOOGLE, AUTH_PROVIDER.FACEBOOK).required(),
  password: Joi.alternatives().conditional('authProvider', {
    is: AUTH_PROVIDER.EMAIL_PASSWORD,
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  phoneNumber: Joi.string().required(),
  userType: Joi.string().valid(USER_TYPES.DOCTOR).required(),
  name: Joi.string().required(),
  gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE).required(),
  district: Joi.string().required(),
  privateClinicAddress: Joi.string(),
  telephoneNumber: Joi.string(),
  languages: Joi.array().items(Joi.string()).min(1).required(),
  serviceCategories: Joi.array().items(Joi.string()).min(1).required(),
  regNo: Joi.string().required(),
  experienceYears: Joi.number().required(),
  serviceAreas: Joi.array().items(Joi.string().valid(SERVICE_AREAS_DOCTOR.ONLINE, SERVICE_AREAS_DOCTOR.PRIVATE_CLINIC, SERVICE_AREAS_DOCTOR.HOME_VISITING)).min(1).required(),
  qualifications: Joi.array().items(Joi.string()).min(1).required(),
  memberships: Joi.array().items(Joi.string()).required(),
  dob: Joi.date().required(),
});

class UserDoctorValidator {
  static signUpValidation(obj) {
    const { value, error } = signUpSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static updateProfileValidation(obj) {
    const { value, error } = updateProfileSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static validateExistingDoctorsValidation(obj) {
    const { value, error } = validateExistingDoctorsSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = UserDoctorValidator;
