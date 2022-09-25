'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('PharmacyOrder', {
    pharmacyOrderId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    patientId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    pharmacyId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
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
    prescriptions: {
      type: Sequelize.STRING,
      get() {
        if (this.getDataValue('prescriptions') === null || this.getDataValue('prescriptions') === undefined) {
          return [];
        } else {
          return this.getDataValue('prescriptions').split(';');
        }
      },
      set(val) {
        if (val.length === 0) {
          this.setDataValue('prescriptions', null);
        } else {
          this.setDataValue('prescriptions', val.join(';'));
        }
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
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
    tableName: 'pharmacy_orders',
    timestamps: true
  });
};
