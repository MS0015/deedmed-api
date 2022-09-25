'use strict';
const AdminDoctorService = require('../services/admin-doctor.service');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const CommonValidator = require('../../../lib/validators/common-validator');
const AdminDoctorValidator = require('../validators/admin-doctor.validator');

exports.getAll = async (req, res, next) => {
  try {
    const { offset, limit } = await CommonValidator.isValidOffsetLimit(req.query);
    const result = await AdminDoctorService.getAll(offset, limit);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.DOCTORS_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.addDoctorByAdmin = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
    const data = await AdminDoctorValidator.createValidation(req.body)
    const result = await AdminDoctorService.addDoctorByAdmin(adminId, data);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.DOCTOR_ADDED_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};
