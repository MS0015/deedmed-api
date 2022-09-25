'use strict';
const { models: { Pharmacy, User } } = require('../../../lib/models/index');

class UserPharmacyRepository {
  static async register(pharmacyData) {
    try {
      const result = await Pharmacy.create(pharmacyData);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getProfile(pharmacyId) {
    try {
      const result = await Pharmacy.findOne({
        where: { pharmacyId },
        attributes: {
          exclude: ['UserUserId']
        },
        include: [{
          model: User,
        }],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async update(pharmacyId, data) {
    try {
      const result = await Pharmacy.update(data, { where: { pharmacyId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll() {
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
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getById(pharmacyId) {
    try {
      const result = await Pharmacy.findOne({
        where: { pharmacyId },
        attributes: {
          exclude: ['UserUserId']
        },
        include: [{
          model: User,
          attributes: {
            exclude: ['password']
          },
        }],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = UserPharmacyRepository;
