'use strict';
const { models: { Doctor, User } } = require('../../../lib/models/index');

class AdminDoctorRepository {

  static async getAll(offset, limit) {
    try {
      const result = await Doctor.findAll({
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
      return await Doctor.count();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AdminDoctorRepository;
