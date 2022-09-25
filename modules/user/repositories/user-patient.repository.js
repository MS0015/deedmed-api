'use strict';
const { models: { Patient, User } } = require('../../../lib/models/index');

class UserPatientRepository {
  static async create(patientData) {
    try {
      const result = await Patient.create(patientData);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getProfile(patientId) {
    try {
      const result = await Patient.findOne({
        where: { patientId },
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
      const result = await Patient.findAll({
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

  static async getById(patientId) {
    try {
      const result = await Patient.findOne({
        where: { patientId },
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

  static async update(patientId, data) {
    try {
      const result = await Patient.update(data, { where: { patientId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = UserPatientRepository;
