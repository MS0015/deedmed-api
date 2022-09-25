'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('MedicalCertificate', {
    medicalCertificateId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    doctorId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    patientId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    appointmentId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    attendingPhysician: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slmcNo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    doctorAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    patientName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    patientAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    diagnosis: {
      type: Sequelize.STRING,
      allowNull: false
    },
    unfitFrom: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    unfitUntil: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    remarks: {
      type: Sequelize.STRING,
      allowNull: false
    },
    signature: {
      type: Sequelize.STRING,
      allowNull: false
    },
    parentId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    updatedBy: {
      type: Sequelize.UUID,
      allowNull: false,
    }
  }, {
    tableName: 'medical_certificates',
    timestamps: true
  });
};
