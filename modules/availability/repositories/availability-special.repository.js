'use strict';
const { models: { AvailabilitySpecial } } = require('../../../lib/models/index');

class AvailabilitySpecialRepository {
  static async create(data) {
    try {
      const result = await AvailabilitySpecial.bulkCreate(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async deleteAllByDoctorId(doctorId) {
    try {
      const result = await AvailabilitySpecial.destroy({ where: { doctorId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllByDoctorId(doctorId) {
    try {
      const result = await AvailabilitySpecial.findAll({ where: { doctorId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AvailabilitySpecialRepository;
