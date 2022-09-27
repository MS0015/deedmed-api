'use strict';
const { models: { Pharmacy, User } } = require('../../../lib/models/index');
const { Op } = require('sequelize');

class AdminPharmacyRepository {

  static async getAll(offset, limit, searchText, maxDeliveryDistanceFilter, serviceAreaFilter) {
    try {
      const where = {};
      if (searchText) {
        where.businessName = {
          [Op.like]: `%${searchText}%`
        };
      }
      if (maxDeliveryDistanceFilter) {
        where.maxDeliveryDistance = maxDeliveryDistanceFilter;
      }
      if (serviceAreaFilter) {
        where.serviceArea = serviceAreaFilter;
      }
      const result = await Pharmacy.findAll({
        where,
        attributes: {
          exclude: ['UserUserId']
        },
        include: [{
          model: User,
          attributes: {
            exclude: ['password']
          },
        }],
        order: [
          ['createdAt', 'DESC']
        ],
        offset,
        limit
      });
      const dataCount = await this.getAllCount(searchText, maxDeliveryDistanceFilter, serviceAreaFilter);
      return Promise.resolve({ data: result, dataCount });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllCount(searchText, maxDeliveryDistanceFilter, serviceAreaFilter) {
    try {
      const where = {};
      if (searchText) {
        where.businessName = {
          [Op.like]: `%${searchText}%`
        };
      }
      if (maxDeliveryDistanceFilter) {
        where.maxDeliveryDistance = maxDeliveryDistanceFilter;
      }
      if (serviceAreaFilter) {
        where.serviceArea = serviceAreaFilter;
      }
      return await Pharmacy.count({ where });
    } catch (err) {
      return Promise.reject(err);
    }
  }


}

module.exports = AdminPharmacyRepository;
