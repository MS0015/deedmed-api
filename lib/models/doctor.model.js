'use strict';
const { Sequelize } = require('sequelize');
const { GENDER } = require('../constant.js');
const { SERVICE_AREAS_DOCTOR } = require('../constant');

module.exports = (sequelize) => {
  return sequelize.define('Doctor', {
    doctorId: {
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
    privateClinicAddress: {
      type: Sequelize.STRING
    },
    telephoneNumber: {
      type: Sequelize.STRING
    },
    languages: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        if (this.getDataValue('languages') === null || this.getDataValue('languages') === undefined) {
          return [];
        } else {
          return this.getDataValue('languages').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('languages', null);
        } else {
          this.setDataValue('languages', val.join(';'));
        }
      },
    },
    serviceCategories: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        if (this.getDataValue('serviceCategories') === null || this.getDataValue('serviceCategories') === undefined) {
          return [];
        } else {
          return this.getDataValue('serviceCategories').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('serviceCategories', null);
        } else {
          this.setDataValue('serviceCategories', val.join(';'));
        }
      },
    },
    regNo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    experienceYears: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    serviceAreas: {
      type: Sequelize.STRING(Sequelize.ENUM(SERVICE_AREAS_DOCTOR.ONLINE, SERVICE_AREAS_DOCTOR.PRIVATE_CLINIC, SERVICE_AREAS_DOCTOR.HOME_VISITING)),
      allowNull: false,
      get() {
        if (this.getDataValue('serviceAreas') === null || this.getDataValue('serviceAreas') === undefined) {
          return [];
        } else {
          return this.getDataValue('serviceAreas').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('serviceAreas', null);
        } else {
          this.setDataValue('serviceAreas', val.join(';'));
        }
      },
    },
    qualifications: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        if (this.getDataValue('qualifications') === null || this.getDataValue('qualifications') === undefined) {
          return [];
        } else {
          return this.getDataValue('qualifications').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('qualifications', null);
        } else {
          this.setDataValue('qualifications', val.join(';'));
        }
      },
    },
    memberships: {
      type: Sequelize.STRING,
      get() {
        if (this.getDataValue('memberships') === null || this.getDataValue('memberships') === undefined) {
          return [];
        } else {
          return this.getDataValue('memberships').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('memberships', null);
        } else {
          this.setDataValue('memberships', val.join(';'));
        }
      },
    },
    profileDescription: {
      type: Sequelize.STRING,
    },
    bankAccountHolderName: {
      type: Sequelize.STRING,
    },
    bankName: {
      type: Sequelize.STRING,
    },
    bankBranch: {
      type: Sequelize.STRING,
    },
    bankAccountNumber: {
      type: Sequelize.STRING,
    },
    consultationFee: {
      type: Sequelize.DOUBLE,
    },
    displayingFee: {
      type: Sequelize.DOUBLE,
    },
    locationLat: {
      type: Sequelize.DOUBLE,
    },
    locationLong: {
      type: Sequelize.DOUBLE,
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: false
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
    tableName: 'doctors',
    timestamps: true
  });
};
