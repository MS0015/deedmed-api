'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Referral', {
    referralId: {
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
    referringProfessionalName: {
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
    clinic: {
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
    reason: {
      type: Sequelize.STRING,
      allowNull: false
    },
    medicalHistory: {
      type: Sequelize.STRING,
      allowNull: false
    },
    symptoms: {
      type: Sequelize.STRING,
      allowNull: false
    },
    result: {
      type: Sequelize.STRING,
      allowNull: false
    },
    diagnosis: {
      type: Sequelize.STRING,
      allowNull: false
    },
    treatment: {
      type: Sequelize.STRING,
      allowNull: false
    },
    note: {
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
    tableName: 'referrals',
    timestamps: true
  });
};
