'use strict';
const UserDoctorService = require('../services/user-doctor.service');
const UserDoctorValidator = require('../validators/user-doctor.validator');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const CustomHttpError = require('../../../lib/custom-http-error');
const UserValidator = require('../validators/user.validator');
const UserService = require('../../user/services/user.service');

exports.signUp = async (req, res, next) => {
  try {
    const signUpData = await UserDoctorValidator.signUpValidation(req.body);
    const result = await UserDoctorService.signUp(signUpData);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.USER_CREATED, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.signIn = async (req, res, next) => {
  try {
    const signInData = await UserValidator.signInValidation(req.body);
    const result = await UserDoctorService.signIn(signInData);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.DOCTOR_SIGN_IN_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getProfile = async (req, res, next) => {
  try {
    const doctorId = req.user.userId;
    const result = await UserDoctorService.getProfile(doctorId);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.DOCTOR_GET_PROFILE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const payload = await UserDoctorValidator.updateProfileValidation(req.body);
    const result = await UserDoctorService.updateProfile(userId, payload);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.DOCTOR_UPDATE_PROFILE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const userType = req.user.userType;
    const result = await UserDoctorService.getAll(userId, userType);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.DOCTORS_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getPatients = async (req, res, next) => {
  try {
    const doctorId = req.user.userId;
    const result = await UserDoctorService.getPatients(doctorId);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PATIENTS_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getById = async (req, res, next) => {
  try {
    if (req.params['doctorId']) {
      const doctorId = req.params['doctorId'];
      const userId = req.user.userId;
      const userType = req.user.userType;
      const result = await UserDoctorService.getById(doctorId, userId, userType);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.DOCTOR_GET_BY_ID_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_DOCTOR_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.validateExistingDoctors = async (req, res, next) => {
  try {
    const { email, phoneNumber } = await UserDoctorValidator.validateExistingDoctorsValidation(req.body);
    const result = await UserService.validateExistingUsers(email, phoneNumber);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.VALIDATING_EXISTING_DOCTORS_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
