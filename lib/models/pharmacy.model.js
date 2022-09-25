'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Pharmacy', {
    pharmacyId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    businessName: {
      type: Sequelize.STRING,
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
    pharmacistName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    regNo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    brNo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    maxDeliveryDistance: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    serviceArea: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING
    },
    locationLat: {
      type: Sequelize.DOUBLE,
    },
    locationLong: {
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
    tableName: 'pharmacies',
    timestamps: true
  });
};
