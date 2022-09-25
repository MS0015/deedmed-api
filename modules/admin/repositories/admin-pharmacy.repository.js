'use strict';
const { models: { Pharmacy, User } } = require('../../../lib/models/index');

class AdminPharmacyRepository {

  static async getAll(offset, limit) {
    try {
      const result = await Pharmacy.findAll({
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
      const dataCount = await this.getCount();
      return Promise.resolve({ data: result, dataCount });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getCount() {
    try {
      return await Pharmacy.count();
    } catch (err) {
      return Promise.reject(err);
    }
  }


}

module.exports = AdminPharmacyRepository;
