'use strict';
const { models: { TestOrder, Patient } } = require('../../../lib/models/index');

class TestOrderRepository {
  static async create(data) {
    try {
      const result = await TestOrder.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async get(appointmentId) {
    try {
      const result = await TestOrder.findOne({
        where: { appointmentId },
        attributes: {
          exclude: ['PatientPatientId', 'DoctorDoctorId', 'AppointmentAppointmentId']
        },
        include: [{
          model: Patient,
          attributes: {
            exclude: ['UserUserId']
          },
        }],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = TestOrderRepository;
