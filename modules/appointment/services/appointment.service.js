'use strict';
const AppointmentRepository = require('../repositories/appointment.repository');
const { v4: uuid } = require('uuid');
const StorageService = require('../../../lib/services/storage-service');
const s3 = new StorageService();
const fs = require('fs');
const SECRET_CONFIGS = require('../../../secret-config');
const { AWS_S3_EXPIRES, APPOINTMENT_STATUS } = require('../../../lib/constant');
const Utils = require('../../../lib/utils');
const PATIENTS_APPOINTMENTS_ATTACHMENTS = SECRET_CONFIGS.AWS_S3_BUCKET_PATIENTS_APPOINTMENTS_ATTACHMENTS;
const PrescriptionRepository = require('../repositories/prescription.repository');
const FactoryService = require('../../../lib/factories/factory-service');

class AppointmentService {
  static async create(userId, data, files) {
    try {
      const appointmentId = uuid();
      const attachments = [];

      if (files.length > 0) {
        for (const file of files) {
          const key = userId + '/' + appointmentId + '/' + file.originalname;
          const imageBuffer = new Buffer.from(fs.readFileSync(file.path).toString('base64'), 'base64');
          await s3.upload(PATIENTS_APPOINTMENTS_ATTACHMENTS, key, imageBuffer);
          fs.unlinkSync(file.path);
          attachments.push(key);
        }
      }

      const appointmentData = {
        appointmentId,
        ...data,
        attachments,
        status: APPOINTMENT_STATUS.PENDING,
        createdBy: userId,
        updatedBy: userId,
      };
      await AppointmentRepository.create(appointmentData);
      return Promise.resolve({ appointmentId });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async update(appointmentId, userId, payload) {
    try {
      const appointmentData = {
        ...payload,
        updatedBy: userId,
        updatedAt: Utils.getDate()
      };
      await AppointmentRepository.update(appointmentId, appointmentData);
      return Promise.resolve({ appointmentId });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getByPatientId(patientId) {
    try {
      const appointments = await AppointmentRepository.getByPatientId(patientId);
      const newAppointments = await this.downloadAppointmentAttachments(appointments);
      return Promise.resolve(newAppointments);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getByDoctorId(doctorId) {
    try {
      const appointments = await AppointmentRepository.getByDoctorId(doctorId);
      const newAppointments = await this.downloadAppointmentAttachments(appointments);
      return Promise.resolve(newAppointments);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getById(appointmentId) {
    try {
      const appointment = await AppointmentRepository.getById(appointmentId);
      const prescriptions = await PrescriptionRepository.getAll(appointmentId);
      if (prescriptions.length > 0) {
        const html = await FactoryService.createPrescriptionHTMLFile(prescriptions);
        const base64PdfString = await Utils.generatePdf(html);
        appointment.setDataValue('prescriptionBase64PdfString', base64PdfString);
      }
      const newAppointments = await this.downloadAppointmentAttachments([appointment]);
      return Promise.resolve(newAppointments);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async downloadAppointmentAttachments(appointments) {
    try {
      const newAppointments = [];
      for (const appointment of appointments) {
        if (appointment.attachments.length > 0 && !appointment.attachments.includes('')) {
          const attachmentUrls = [];
          for (const attachment of appointment.attachments) {
            const attachmentUrl = await s3.getSignedUrl(PATIENTS_APPOINTMENTS_ATTACHMENTS, attachment, 'getObject', AWS_S3_EXPIRES.PATIENT_APPOINTMENT_ATTACHMENT);
            attachmentUrls.push(attachmentUrl);
          }
          appointment.attachments = attachmentUrls;
        }
        newAppointments.push(appointment);
      }
      return Promise.resolve(newAppointments);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AppointmentService;
