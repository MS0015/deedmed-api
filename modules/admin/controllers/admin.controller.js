'use strict';
const UserValidator = require('../../user/validators/user.validator');
const AdminValidator = require('../validators/admin.validator');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, USER_TYPES } = require('../../../lib/constant');
const AdminService = require('../services/admin.service');
const UserService = require('../../user/services/user.service');

exports.signIn = async (req, res, next) => {
  try {
    const signInData = await UserValidator.signInValidation(req.body);
    const result = await AdminService.signIn(signInData);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.ADMIN_SIGN_IN_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = await AdminValidator.forgotPasswordValidation(req.body);
    const result = await UserService.forgotPassword(email, [USER_TYPES.ADMIN]);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.EMAIL_VERIFICATION_CODE_SEND_SUCCESS, result);
  } catch
    (err) {
    Utils.errorResponse(res, err);
  }
};

exports.verifyEmailCode = async (req, res, next) => {
  try {
    const { email, code } = await AdminValidator.verifyEmailCodeValidation(req.body);
    const result = await UserService.verifyEmailCode(email, [USER_TYPES.ADMIN], code);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.EMAIL_VERIFICATION_CODE_VERIFY_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { email, code, password } = await AdminValidator.updatePasswordValidation(req.body);
    const result = await UserService.updatePassword(email, [USER_TYPES.ADMIN], code, password);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.UPDATE_PASSWORD_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};
