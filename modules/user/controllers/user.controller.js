'use strict';
const UserService = require('../services/user.service');
const UserValidator = require('../validators/user.validator');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS } = require('../../../lib/constant.js');

exports.sendOTP = async (req, res, next) => {
  try {
    const { phoneNumber } = await UserValidator.sendOTPValidation(req.body);
    const result = await UserService.sendOTP(phoneNumber);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.SEND_OTP_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.validateExistingUsers = async (req, res, next) => {
  try {
    const { email, phoneNumber } = await UserValidator.validateExistingUsersValidation(req.body);
    const result = await UserService.validateExistingUsers(email, phoneNumber);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.VALIDATING_EXISTING_USERS_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.signUpGoogle = async (req, res, next) => {
  try {
    const { token } = await UserValidator.socialTokenValidation(req.body);
    const result = await UserService.signUpGoogle(token);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.GOOGLE_SIGN_UP_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.signInGoogle = async (req, res, next) => {
  try {
    const { token, userTypes } = await UserValidator.socialSignInValidation(req.body);
    const result = await UserService.signInGoogle(token, userTypes);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.GOOGLE_SIGN_IN_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.signUpFacebook = async (req, res, next) => {
  try {
    const { token } = await UserValidator.socialTokenValidation(req.body);
    const result = await UserService.signUpFacebook(token);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.FACEBOOK_SIGN_UP_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.signInFacebook = async (req, res, next) => {
  try {
    const { token, userTypes } = await UserValidator.socialSignInValidation(req.body);
    const result = await UserService.signInFacebook(token, userTypes);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.FACEBOOK_SIGN_IN_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email, userTypes } = await UserValidator.forgotPasswordValidation(req.body);
    const result = await UserService.forgotPassword(email, userTypes);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.EMAIL_VERIFICATION_CODE_SEND_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.verifyEmailCode = async (req, res, next) => {
  try {
    const { email, userTypes, code } = await UserValidator.verifyEmailCodeValidation(req.body);
    const result = await UserService.verifyEmailCode(email, userTypes, code);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.EMAIL_VERIFICATION_CODE_VERIFY_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.updatePassword = async (req, res, next) => {
  try {
    const { email, userTypes, code, password } = await UserValidator.updatePasswordValidation(req.body);
    const result = await UserService.updatePassword(email, userTypes, code, password);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.UPDATE_PASSWORD_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.updateProfileImage = async (req, res, next) => {
  try {
    const { user: { userId }, file } = req;
    if (!file) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.NO_PROFILE_IMAGE_TO_UPLOAD));
    }
    const result = await UserService.updateProfileImage(userId, file);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PROFILE_IMAGE_UPLOAD_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
