'use strict';
const AdminPatientService = require('../services/admin-patient.service');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const AdminPatientValidator = require('../validators/admin-patient.validator');

exports.getAll = async (req, res, next) => {
  try {
    const { userTypes, offset, limit, searchText } = await AdminPatientValidator.getAllValidation(req.query);
    const result = await AdminPatientService.getAll(userTypes, offset, limit, searchText);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PATIENTS_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.addPatientByAdmin = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
    const data = await AdminPatientValidator.createValidation(req.body);
    const result = await AdminPatientService.addPatientByAdmin(adminId, data);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PATIENT_ADDED_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};
