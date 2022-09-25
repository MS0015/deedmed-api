'use strict';
const AdminCategoryService = require('../services/admin-category.service');
const AdminCategoryValidator = require('../validators/admin-category.validator');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS } = require('../../../lib/constant.js');

exports.create = async (req, res, next) => {
  try {
    const { user: { userId }, body, file } = req;
    if (!file) {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.CATEGORY_ICON_IS_REQUIRED);
    }
    const { name } = await AdminCategoryValidator.createValidation(body);
    const result = await AdminCategoryService.create(userId, name, file);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.CATEGORY_CREATE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await AdminCategoryService.getAll();
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.CATEGORIES_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};
