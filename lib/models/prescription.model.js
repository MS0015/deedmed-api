'use strict';
const { Sequelize } = require('sequelize');
const { PRESCRIPTION_TYPE } = require('../constant');

module.exports = (sequelize) => {
  return sequelize.define('Prescription', {
    prescriptionId: {
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
    type: {
      type: Sequelize.ENUM(PRESCRIPTION_TYPE.TABLET, PRESCRIPTION_TYPE.SYRUP, PRESCRIPTION_TYPE.TOPICAL),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    duration: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantityOrVolume: {
      type: Sequelize.STRING
    },
    frequency: {
      type: Sequelize.STRING,
      allowNull: false
    },
    remarks: {
      type: Sequelize.STRING
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
    tableName: 'prescriptions',
    timestamps: true
  });
};
