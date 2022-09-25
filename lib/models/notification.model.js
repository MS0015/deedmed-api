'use-strict';
const {Sequelize} = require('sequelize');
const {NOTIFICATION_STATUS} = require('../constant');

module.exports = (sequelize) => {
    return sequelize.define('Notification', {
        params: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        mobile: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        deviceId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status:{
            type: Sequelize.ENUM(NOTIFICATION_STATUS.NOTIFICATION_CREATED, NOTIFICATION_STATUS.NOTIFICATION_QUEUED, NOTIFICATION_STATUS.NOTIFICATION_SENT_TO_GW),
            allowNull: false
        }
    }, {
        tableName: 'notifications',
        timestamps: true
    });
};
