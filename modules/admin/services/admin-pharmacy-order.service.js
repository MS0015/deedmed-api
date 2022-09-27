'use strict';
const AdminPharmacyOrderRepository = require('../repositories/admin-pharmacy-order.repository');
const PharmacyOrderService = require('../../pharmacy-order/services/pharmacy-order.service');

class AdminPharmacyOrderService {

  static async getAllOrders(pharmacyId, offset, limit, type, statuses, fromDate, toDate) {
    try {
      const result = await AdminPharmacyOrderRepository.getAll(pharmacyId, offset, limit, type, statuses, fromDate, toDate);
      result.data = await PharmacyOrderService.downloadPrescriptions(result.data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AdminPharmacyOrderService;
