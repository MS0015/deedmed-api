'use strict';
const { models: { Appointment, Doctor, Patient } } = require('../../../lib/models/index');

class AppointmentRepository {
  static async create(data) {
    try {
      const result = await Appointment.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async update(appointmentId, data) {
    try {
      const result = await Appointment.update(data, { where: { appointmentId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getByPatientId(patientId) {
    try {
      const result = await Appointment.findAll({
        where: { patientId },
        attributes: {
          exclude: ['DoctorDoctorId', 'PatientPatientId']
        },
        include: [
          {
            model: Doctor,
            attributes: {
              exclude: ['UserUserId']
            },
          },
          {
            model: Patient,
            attributes: {
              exclude: ['UserUserId']
            },
          }
        ],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getByDoctorId(doctorId) {
    try {
      const result = await Appointment.findAll({
        where: { doctorId },
        attributes: {
          exclude: ['DoctorDoctorId', 'PatientPatientId']
        },
        include: [
          {
            model: Doctor,
            attributes: {
              exclude: ['UserUserId']
            },
          },
          {
            model: Patient,
            attributes: {
              exclude: ['UserUserId']
            },
          }
        ],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAppointmentPatients(doctorId) {
    try {
      const result = await Appointment.findAll({
        where: { doctorId },
        attributes: ['patientId'],
        include: [
          {
            model: Patient,
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

  static async getById(appointmentId) {
    try {
      const result = await Appointment.findOne({
        where: { appointmentId },
        attributes: {
          exclude: ['DoctorDoctorId', 'PatientPatientId']
        },
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

module.exports = AppointmentRepository;
