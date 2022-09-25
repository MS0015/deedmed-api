'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('AvailabilitySpecial', {
    availabilityId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    doctorId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    consultationTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    gapTime: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    morningType: {
      type: Sequelize.STRING
    },
    morningStart: {
      type: Sequelize.TIME
    },
    morningEnd: {
      type: Sequelize.TIME
    },
    eveningType: {
      type: Sequelize.STRING
    },
    eveningStart: {
      type: Sequelize.TIME
    },
    eveningEnd: {
      type: Sequelize.TIME
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
    tableName: 'availability_special',
    timestamps: true
  });
};
