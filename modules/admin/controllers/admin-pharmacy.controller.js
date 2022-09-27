'use strict';
const AdminPharmacyService = require('../services/admin-pharmacy.service');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const CommonValidator = require('../../../lib/validators/common-validator');
const AdminPharmacyValidator = require('../validators/admin-pharmacy.validator');
const CustomHttpError = require('../../../lib/custom-http-error');

exports.getAll = async (req, res, next) => {
  try {
    const {
      offset,
      limit,
      searchText,
      maxDeliveryDistanceFilter,
      serviceAreaFilter
    } = await AdminPharmacyValidator.getAllValidation(req.query);
    const result = await AdminPharmacyService.getAll(offset, limit, searchText, maxDeliveryDistanceFilter, serviceAreaFilter);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACIES_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.addPharmacyByAdmin = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
    const data = await AdminPharmacyValidator.createValidation(req.body);
    const result = await AdminPharmacyService.addPharmacyByAdmin(data, adminId);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PHARMACY_ADDED_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.updatePharmacyByAdmin = async (req, res, next) => {
  try {
    if (req.params['pharmacyId']) {
      const pharmacyId = req.params['pharmacyId'];
      const adminId = req.user.userId;
      const data = await AdminPharmacyValidator.updateValidation(req.body);
      const result = await AdminPharmacyService.updatePharmacyByAdmin(pharmacyId, data, adminId);
      Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PHARMACY_UPDATED_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_PHARMACY_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};
