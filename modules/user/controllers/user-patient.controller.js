"use strict";
const UserPatientService = require("../services/user-patient.service");
const UserPatientValidator = require("../validators/user-patient.validator");
const Utils = require("../../../lib/utils");
const { HTTP_CODES, MESSAGES, ERRORS } = require("../../../lib/constant");
const CustomHttpError = require("../../../lib/custom-http-error");
const UserValidator = require("../validators/user.validator");
const UserService = require("../../user/services/user.service");

exports.signUp = async (req, res, next) => {
  try {
    const signUpData = await UserPatientValidator.signUpValidation(req.body);
    const result = await UserPatientService.signUp(signUpData);
    Utils.successResponse(
      res,
      HTTP_CODES.CREATED,
      MESSAGES.USER_CREATED,
      result
    );
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const signInData = await UserValidator.signInValidation(req.body);
    const result = await UserPatientService.signIn(signInData);
    Utils.successResponse(
      res,
      HTTP_CODES.OK,
      MESSAGES.PATIENT_SIGN_IN_SUCCESS,
      result
    );
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const patientId = req.user.userId;
    const result = await UserPatientService.getProfile(patientId);
    Utils.successResponse(
      res,
      HTTP_CODES.OK,
      MESSAGES.PATIENT_GET_PROFILE_SUCCESS,
      result
    );
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const payload = await UserPatientValidator.updateProfileValidation(
      req.body
    );
    const result = await UserPatientService.updateProfile(userId, payload);
    Utils.successResponse(
      res,
      HTTP_CODES.OK,
      MESSAGES.PATIENT_UPDATE_PROFILE_SUCCESS,
      result
    );
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await UserPatientService.getAll();
    Utils.successResponse(
      res,
      HTTP_CODES.OK,
      MESSAGES.PATIENTS_GET_SUCCESS,
      result
    );
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    if (req.params["patientId"]) {
      const patientId = req.params["patientId"];
      const result = await UserPatientService.getById(patientId);
      Utils.successResponse(
        res,
        HTTP_CODES.OK,
        MESSAGES.PATIENT_GET_BY_ID_SUCCESS,
        result
      );
    } else {
      throw new CustomHttpError(
        HTTP_CODES.BAD_REQUEST,
        ERRORS.VALIDATION_ERROR,
        MESSAGES.PATH_PARAMETER_MISSING_PATIENT_ID
      );
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.validateExistingPatients = async (req, res, next) => {
  try {
    const { email, phoneNumber } =
      await UserPatientValidator.validateExistingPatientsValidation(req.body);
    const result = await UserService.validateExistingUsers(email, phoneNumber);
    Utils.successResponse(
      res,
      HTTP_CODES.OK,
      MESSAGES.VALIDATING_EXISTING_PATIENTS_SUCCESS,
      result
    );
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};
