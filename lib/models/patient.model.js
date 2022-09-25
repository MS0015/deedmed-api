'use strict';
const { Sequelize } = require('sequelize');
const { GENDER } = require('../constant.js');

module.exports = (sequelize) => {
  return sequelize.define('Patient', {
    patientId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.ENUM(GENDER.MALE, GENDER.FEMALE),
      allowNull: false
    },
    district: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    longTermMedic: {
      type: Sequelize.STRING,
      get() {
        if (this.getDataValue('longTermMedic') === null || this.getDataValue('longTermMedic') === undefined) {
          return [];
        } else {
          return this.getDataValue('longTermMedic').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('longTermMedic', null);
        } else {
          this.setDataValue('longTermMedic', val.join(';'));
        }
      },
    },
    allergies: {
      type: Sequelize.STRING,
      get() {
        if (this.getDataValue('allergies') === null || this.getDataValue('allergies') === undefined) {
          return [];
        } else {
          return this.getDataValue('allergies').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('allergies', null);
        } else {
          this.setDataValue('allergies', val.join(';'));
        }
      },
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
    tableName: 'patients',
    timestamps: true
  });
};
