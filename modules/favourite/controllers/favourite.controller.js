'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const FavouriteService = require('../services/favourite.service');
const CustomHttpError = require('../../../lib/custom-http-error');

exports.addFavoriteDoctor = async (req, res, next) => {
  try {
    if (req.params['doctorId']) {
      const doctorId = req.params['doctorId'];
      const userId = req.user.userId;
      const result = await FavouriteService.addFavoriteDoctor(userId, doctorId);
      Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PATIENT_FAVOURITE_DOCTOR_ADD_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_DOCTOR_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.removeFavoriteDoctor = async (req, res, next) => {
  try {
    if (req.params['doctorId']) {
      const doctorId = req.params['doctorId'];
      const userId = req.user.userId;
      const result = await FavouriteService.removeFavoriteDoctor(userId, doctorId);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PATIENT_FAVOURITE_DOCTOR_REMOVE_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_DOCTOR_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getFavoriteDoctors = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await FavouriteService.getFavoriteDoctors(userId);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PATIENT_FAVOURITE_DOCTOR_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.addFavoritePharmacy = async (req, res, next) => {
  try {
    if (req.params['pharmacyId']) {
      const pharmacyId = req.params['pharmacyId'];
      const userId = req.user.userId;
      const result = await FavouriteService.addFavoritePharmacy(userId, pharmacyId);
      Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PATIENT_FAVOURITE_PHARMACY_ADD_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_PHARMACY_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.removeFavoritePharmacy = async (req, res, next) => {
  try {
    if (req.params['pharmacyId']) {
      const pharmacyId = req.params['pharmacyId'];
      const userId = req.user.userId;
      const result = await FavouriteService.removeFavoritePharmacy(userId, pharmacyId);
      Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PATIENT_FAVOURITE_PHARMACY_REMOVE_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_PHARMACY_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getFavoritePharmacies = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await FavouriteService.getFavoritePharmacies(userId);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PATIENT_FAVOURITE_PHARMACY_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
