'use strict';
const AdminPharmacyOrderService = require('../services/admin-pharmacy-order.service');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const AdminPharmacyOrderValidator = require('../validators/admin-pharmacy-order.validator');

exports.getAllOrders = async (req, res, next) => {
  try {
    const {
      pharmacyId,
      offset,
      limit,
      type,
      statuses,
      fromDate,
      toDate
    } = await AdminPharmacyOrderValidator.getAllOrders(req.query);
    const result = await AdminPharmacyOrderService.getAllOrders(pharmacyId, offset, limit, type, statuses, fromDate, toDate);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACY_ORDERS_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};
