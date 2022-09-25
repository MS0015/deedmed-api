'use strict';
const { models: { Prescription, Patient, Doctor } } = require('../../../lib/models/index');

class PrescriptionRepository {
  static async bulkCreate(data) {
    try {
      const result = await Prescription.bulkCreate(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll(appointmentId) {
    try {
      const result = await Prescription.findAll({
        where: { appointmentId },
        include: [
          {
            model: Patient,
            attributes: {
              exclude: ['UserUserId']
            }
          },
          {
            model: Doctor,
            attributes: {
              exclude: ['UserUserId']
            }
          }
        ],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = PrescriptionRepository;
