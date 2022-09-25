'use strict';
const UserPharmacyService = require('../services/user-pharmacy.service');
const UserPharmacyValidator = require('../validators/user-pharmacy.validator');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const CustomHttpError = require('../../../lib/custom-http-error');
const UserValidator = require('../validators/user.validator');
const UserService = require('../../user/services/user.service');

exports.register = async (req, res, next) => {
  try {
    const registerData = await UserPharmacyValidator.registerValidation(req.body);
    const result = await UserPharmacyService.register(registerData);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PHARMACY_REGISTERED, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const signInData = await UserValidator.signInValidation(req.body);
    const result = await UserPharmacyService.signIn(signInData);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACY_SIGN_IN_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const pharmacyId = req.user.userId;
    const result = await UserPharmacyService.getProfile(pharmacyId);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACY_GET_PROFILE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const payload = await UserPharmacyValidator.updateProfileValidation(req.body);
    const result = await UserPharmacyService.updateProfile(userId, payload);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACY_UPDATE_PROFILE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const userType = req.user.userType;
    const result = await UserPharmacyService.getAll(userId, userType);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACIES_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    if (req.params['pharmacyId']) {
      const pharmacyId = req.params['pharmacyId'];
      const userId = req.user.userId;
      const userType = req.user.userType;
      const result = await UserPharmacyService.getById(pharmacyId, userId, userType);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACY_GET_BY_ID_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_PHARMACY_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.validateExistingPharmacies = async (req, res, next) => {
  try {
    const { email, phoneNumber } = await UserPharmacyValidator.validateExistingPharmaciesValidation(req.body);
    const result = await UserService.validateExistingUsers(email, phoneNumber);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.VALIDATING_EXISTING_PHARMACIES_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};
