'use strict';
const { models: { PharmacyOrder, Pharmacy } } = require('../../../lib/models/index');
const { Op } = require('sequelize');

class AdminPharmacyOrderRepository {

  static async getAll(pharmacyId, offset, limit, type, statuses, fromDate, toDate) {
    try {
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);
      const where = {
        type,
        status: statuses,
        createdAt: {
          [Op.gte]: fromDate,
          [Op.lte]: toDate
        }
      };
      if (pharmacyId) {
        where.pharmacyId = pharmacyId;
      }
      const result = await PharmacyOrder.findAll({
        where,
        attributes: {
          exclude: ['PatientPatientId', 'PharmacyPharmacyId']
        },
        include: [
          {
            model: Pharmacy,
            attributes: {
              exclude: ['UserUserId']
            },
          }
        ],
        order: [
          ['createdAt', 'DESC']
        ],
        offset,
        limit
      });
      const dataCount = await this.getAllCount(pharmacyId, offset, limit, type, statuses, fromDate, toDate);
      return Promise.resolve({ data: result, dataCount });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllCount(pharmacyId, offset, limit, type, statuses, fromDate, toDate) {
    try {
      const where = {
        type,
        status: statuses,
        createdAt: {
          [Op.gte]: fromDate,
          [Op.lte]: toDate
        }
      };
      if (pharmacyId) {
        where.pharmacyId = pharmacyId;
      }
      return await PharmacyOrder.count({
        where
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }


}

module.exports = AdminPharmacyOrderRepository;
