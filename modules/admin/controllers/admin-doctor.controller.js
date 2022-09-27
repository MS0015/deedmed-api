'use strict';
const AdminDoctorService = require('../services/admin-doctor.service');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const AdminDoctorValidator = require('../validators/admin-doctor.validator');
const UserDoctorValidator = require('../../user/validators/user-doctor.validator');
const CustomHttpError = require('../../../lib/custom-http-error');

exports.getAll = async (req, res, next) => {
  try {
    const {
      offset,
      limit,
      searchText,
      genderFilter,
      experienceYearsFilter,
      serviceCategoriesFilter,
      serviceAreasFilter
    } = await AdminDoctorValidator.getAllValidation(req.query);
    const result = await AdminDoctorService.getAll(offset, limit, searchText, genderFilter, experienceYearsFilter, serviceCategoriesFilter, serviceAreasFilter);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.DOCTORS_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.addDoctorByAdmin = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
    const data = await AdminDoctorValidator.createValidation(req.body);
    const result = await AdminDoctorService.addDoctorByAdmin(adminId, data);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.DOCTOR_ADDED_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.updateByAdmin = async (req, res, next) => {
  try {
    if (req.params['doctorId']) {
      const doctorId = req.params['doctorId'];
      const adminId = req.user.userId;
      const payload = await UserDoctorValidator.updateProfileValidation(req.body);
      const result = await AdminDoctorService.updateByAdmin(doctorId, adminId, payload);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.DOCTOR_UPDATE_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_DOCTOR_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};
