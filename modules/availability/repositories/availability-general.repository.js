'use strict';
const { models: { AvailabilityGeneral } } = require('../../../lib/models/index');

class AvailabilityGeneralRepository {
  static async create(data) {
    try {
      const result = await AvailabilityGeneral.bulkCreate(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async deleteAllByDoctorId(doctorId) {
    try {
      const result = await AvailabilityGeneral.destroy({ where: { doctorId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllByDoctorId(doctorId) {
    try {
      const result = await AvailabilityGeneral.findAll({ where: { doctorId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AvailabilityGeneralRepository;
