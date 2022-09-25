'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const logger = require('../logger');
const SECRET_CONFIGS = require('../../secret-config');
const CONSTANT = require('../constant.js');

const applyAssociations = (sequelize) => {
  const {
    User,
    Patient,
    Doctor,
    Pharmacy,
    AvailabilityGeneral,
    AvailabilitySpecial,
    OTPVerifications,
    EmailVerifications,
    Appointment,
    Category,
    PharmacyOrder,
    Notification,
    NotificationGroup,
    NotificationChannel,
    NotificationTemplate,
    Payment,
    SeqPaymentRef,
    FavouriteDoctor,
    FavouritePharmacy,
    TestOrder,
    MedicalCertificate,
    Referral,
    Prescription,
  } = sequelize.models;

  User.hasOne(Doctor);
  Doctor.belongsTo(User, { foreignKey: 'doctorId' });
  User.hasOne(Patient);
  Patient.belongsTo(User, { foreignKey: 'patientId' });
  User.hasOne(Pharmacy);
  Pharmacy.belongsTo(User, { foreignKey: 'pharmacyId' });

  Doctor.hasMany(Appointment);
  Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });
  Patient.hasMany(Appointment);
  Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

  Patient.hasMany(PharmacyOrder);
  PharmacyOrder.belongsTo(Patient, { foreignKey: 'patientId' });
  Pharmacy.hasMany(PharmacyOrder);
  PharmacyOrder.belongsTo(Pharmacy, { foreignKey: 'pharmacyId' });

  Patient.hasMany(FavouriteDoctor);
  FavouriteDoctor.belongsTo(Patient, { foreignKey: 'patientId' });
  Doctor.hasMany(FavouriteDoctor);
  FavouriteDoctor.belongsTo(Doctor, { foreignKey: 'doctorId' });

  Patient.hasMany(FavouritePharmacy);
  FavouritePharmacy.belongsTo(Patient, { foreignKey: 'patientId' });
  Pharmacy.hasMany(FavouritePharmacy);
  FavouritePharmacy.belongsTo(Pharmacy, { foreignKey: 'pharmacyId' });

  Patient.hasMany(TestOrder);
  Doctor.hasMany(TestOrder);
  Appointment.hasMany(TestOrder);
  TestOrder.belongsTo(Patient, { foreignKey: 'patientId' });
  TestOrder.belongsTo(Doctor, { foreignKey: 'doctorId' });
  TestOrder.belongsTo(Appointment, { foreignKey: 'appointmentId' });

  Patient.hasMany(MedicalCertificate);
  Doctor.hasMany(MedicalCertificate);
  Appointment.hasMany(MedicalCertificate);
  MedicalCertificate.belongsTo(Patient, { foreignKey: 'patientId' });
  MedicalCertificate.belongsTo(Doctor, { foreignKey: 'doctorId' });
  MedicalCertificate.belongsTo(Appointment, { foreignKey: 'appointmentId' });

  Patient.hasMany(Referral);
  Doctor.hasMany(Referral);
  Appointment.hasMany(Referral);
  Referral.belongsTo(Patient, { foreignKey: 'patientId' });
  Referral.belongsTo(Doctor, { foreignKey: 'doctorId' });
  Referral.belongsTo(Appointment, { foreignKey: 'appointmentId' });

  Patient.hasMany(Prescription);
  Doctor.hasMany(Prescription);
  Appointment.hasMany(Prescription);
  Prescription.belongsTo(Patient, { foreignKey: 'patientId' });
  Prescription.belongsTo(Doctor, { foreignKey: 'doctorId' });
  Prescription.belongsTo(Appointment, { foreignKey: 'appointmentId' });

  // Notification Associations
  NotificationTemplate.belongsTo(NotificationGroup, {foreignKey: 'groupId'});
  NotificationTemplate.belongsTo(NotificationChannel, {foreignKey: 'channelId'});
  Notification.belongsTo(NotificationGroup, {foreignKey: 'groupId'});
  Notification.belongsTo(NotificationTemplate, {foreignKey: 'templateId'});
  Notification.belongsTo(NotificationChannel, {foreignKey: 'channelId'});

  // Payment Associations
  //Payment.belongsTo(Patient, {foreignKey: 'patientId'});
  //Patient.belongsTo(FavouriteDoctor, { foreignKey: 'patientId' });
  //Doctor.belongsTo(FavouriteDoctor, { foreignKey: 'doctorId' });
};

const sequelize = new Sequelize(SECRET_CONFIGS.MYSQL_DATABASE, SECRET_CONFIGS.MYSQL_USER, SECRET_CONFIGS.MYSQL_PASSWORD, {
  dialect: SECRET_CONFIGS.MYSQL_DIALECT,
  host: SECRET_CONFIGS.MYSQL_HOST,
  port: SECRET_CONFIGS.MYSQL_PORT,
  timezone: '+05:30',
  logging: msg => logger.debug(msg),
  dialectOptions: {
    decimalNumbers: true
  }
});

const modelDefiners = [
  require('./user.model'),
  require('./patient.model'),
  require('./doctor.model'),
  require('./pharmacy.model'),
  require('./availability-general.model'),
  require('./availability-special.model'),
  require('./otp-verification.model'),
  require('./email-verification.model'),
  require('./appoinment.model'),
  require('./category.model'),
  require('./pharmacy-order.model'),
  require('./favourite-doctor.model'),
  require('./favourite-pharmacy.model'),
  require('./test-order.model'),
  require('./medical-certificate.model'),
  require('./referral.model'),
  require('./prescription.model'),
  require('./notification-channel.model'),
  require('./notification-group.model'),
  require('./notification-template.model'),
  require('./notification.model'),
  require('./payment.model'),
  require('./seq-payment-ref.model'),
  require('./favourite-doctor.model'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, DataTypes);
}

applyAssociations(sequelize);

class Database {
  static async initialize() {
    try {
      return sequelize.sync();
    } catch (err) {
   //   logger.log(CONSTANT.LOGGER.ERROR, err);
      return Promise.reject(err);
    }
  }
}

Database.models = sequelize.models;
Database.sequelize = sequelize;

module.exports = Database;
