'use strict';
const AdminAppointmentRepository = require('../repositories/admin-appointment.repository');
const { TIME_FILTER, APPOINTMENT_STATUS, MESSAGES } = require('../../../lib/constant');
const Utils = require('../../../lib/utils');
const AppointmentRepository = require('../../appointment/repositories/appointment.repository');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');

class AdminAppointmentService {

  static async getByPatientId(patientId, offset, limit) {
    try {
      const result = await AdminAppointmentRepository.getByPatientId(patientId, offset, limit);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getByDoctorId(doctorId, offset, limit) {
    try {
      const result = await AdminAppointmentRepository.getByDoctorId(doctorId, offset, limit);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll(offset, limit, timeFilter) {
    try {
      let result;

      if (timeFilter === TIME_FILTER.ALL) {

        result = await AdminAppointmentRepository.getAll(offset, limit);

      } else {

        if (timeFilter === TIME_FILTER.PAST) {

          const dateForPast = Utils.getDate();
          const dateOnlyForPast = dateForPast.toISOString().split('T')[0];
          const timeOnlyForPast = dateForPast.toLocaleTimeString('it-IT');

          result = await AdminAppointmentRepository.getAllPast(offset, limit, dateOnlyForPast, timeOnlyForPast);

        } else if (timeFilter === TIME_FILTER.PRESENT) {

          const dateForNow = Utils.getDate();
          const dateOnlyForNow = dateForNow.toISOString().split('T')[0];
          const timeOnlyForNow = dateForNow.toLocaleTimeString('it-IT');

          const dateForNextThirtyMinutes = Utils.getDate();
          const dateFromThirtyMinutesNow = new Date(dateForNextThirtyMinutes.setMinutes(dateForNextThirtyMinutes.getMinutes() + 30));
          const dateOnlyFromThirtyMinutesNow = dateFromThirtyMinutesNow.toISOString().split('T')[0];
          const timeOnlyFromThirtyMinutesNow = dateFromThirtyMinutesNow.toLocaleTimeString('it-IT');

          result = await AdminAppointmentRepository.getAllPresent(offset, limit, dateOnlyForNow, timeOnlyForNow, dateOnlyFromThirtyMinutesNow, timeOnlyFromThirtyMinutesNow);

        } else {

          const dateForNextThirtyMinutes = Utils.getDate();
          const dateFromThirtyMinutesNow = new Date(dateForNextThirtyMinutes.setMinutes(dateForNextThirtyMinutes.getMinutes() + 30));
          const dateOnlyFromThirtyMinutesNow = dateFromThirtyMinutesNow.toISOString().split('T')[0];
          const timeOnlyFromThirtyMinutesNow = dateFromThirtyMinutesNow.toLocaleTimeString('it-IT');

          result = await AdminAppointmentRepository.getAllFuture(offset, limit, dateOnlyFromThirtyMinutesNow, timeOnlyFromThirtyMinutesNow);

        }

      }

      return Promise.resolve(result);

    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async update(appointmentId, adminId, payload) {
    try {
      if (payload.status && payload.status === APPOINTMENT_STATUS.CANCELED) {

        const dateForNextThirtyMinutes = Utils.getDate();
        const dateFromThirtyMinutesNow = new Date(dateForNextThirtyMinutes.setMinutes(dateForNextThirtyMinutes.getMinutes() + 30));
        const dateOnlyFromThirtyMinutesNow = dateFromThirtyMinutesNow.toISOString().split('T')[0];
        const timeOnlyFromThirtyMinutesNow = dateFromThirtyMinutesNow.toLocaleTimeString('it-IT');

        const appointments = await AdminAppointmentRepository.getAllFuturePendingWithoutOffsetLimit(dateOnlyFromThirtyMinutesNow, timeOnlyFromThirtyMinutesNow);

        const existingAppointment = appointments.find(appointment => appointment.appointmentId === appointmentId);

        if (!existingAppointment) {
          return Promise.reject(new CustomHttpError(HTTP_CODES.UNPROCESSABLE_ENTITY, ERRORS.VALIDATION_ERROR, MESSAGES.CANNOT_CANCEL_NON_FUTURE_APPOINTMENTS));
        }
      }
      const appointmentData = {
        ...payload,
        updatedBy: adminId,
        updatedAt: Utils.getDate()
      };
      await AppointmentRepository.update(appointmentId, appointmentData);
      return Promise.resolve({ appointmentId });
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

module.exports = AdminAppointmentService;
