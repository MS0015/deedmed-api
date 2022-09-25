'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('AvailabilityGeneral', {
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
    dayIndex: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    morningStart: {
      type: Sequelize.TIME
    },
    morningEnd: {
      type: Sequelize.TIME
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
    tableName: 'availability_general',
    timestamps: true
  });
};
