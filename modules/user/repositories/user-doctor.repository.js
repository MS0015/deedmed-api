'use strict';
const { models: { Doctor, User } } = require('../../../lib/models/index');

class UserDoctorRepository {
  static async create(patientData) {
    try {
      const result = await Doctor.create(patientData);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getProfile(doctorId) {
    try {
      const result = await Doctor.findOne({
        where: { doctorId },
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

  static async getAll() {
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
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getById(doctorId) {
    try {
      const result = await Doctor.findOne({
        where: { doctorId },
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

  static async update(doctorId, data) {
    try {
      const result = await Doctor.update(data, { where: { doctorId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = UserDoctorRepository;
