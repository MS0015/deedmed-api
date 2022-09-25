'use strict';
const { Sequelize } = require('sequelize');
const { SLOT_TYPES, APPOINTMENT_TYPES } = require('../constant');

module.exports = (sequelize) => {
  return sequelize.define('Appointment', {
    appointmentId: {
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
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    slotTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    slotType: {
      type: Sequelize.ENUM(SLOT_TYPES.MORNING, SLOT_TYPES.EVENING),
      allowNull: false
    },
    appointmentType: {
      type: Sequelize.ENUM(APPOINTMENT_TYPES.ONLINE, APPOINTMENT_TYPES.PHYSICAL),
      allowNull: false
    },
    purpose: {
      type: Sequelize.STRING,
      allowNull: false
    },
    medicalDetails: {
      type: Sequelize.STRING,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false
    },
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    paymentId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    attachments: {
      type: Sequelize.STRING,
      get() {
        if (this.getDataValue('attachments') === null || this.getDataValue('attachments') === undefined) {
          return [];
        } else {
          return this.getDataValue('attachments').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('attachments', null);
        } else {
          this.setDataValue('attachments', val.join(';'));
        }
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    doctorRating: {
      type: Sequelize.INTEGER
    },
    patientRating: {
      type: Sequelize.INTEGER
    },
    comments: {
      type: Sequelize.STRING,
      get() {
        if (this.getDataValue('comments') === null || this.getDataValue('comments') === undefined) {
          return [];
        } else {
          return this.getDataValue('comments').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('comments', null);
        } else {
          this.setDataValue('comments', val.join(';'));
        }
      },
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
    tableName: 'appointments',
    timestamps: true
  });
};
