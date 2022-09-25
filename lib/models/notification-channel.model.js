'use-strict';
const {Sequelize} = require('sequelize');
const {NOTIFICATION_CHANNEL} = require('../constant');

module.exports = (sequelize) => {
    return sequelize.define('NotificationChannel', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status:{
            type: Sequelize.STRING(NOTIFICATION_CHANNEL.ACTIVE, NOTIFICATION_CHANNEL.INACTIVE),
            allowNull: false
        }
    }, {
        tableName: 'notification_channels',
        timestamps: true
    });
};
