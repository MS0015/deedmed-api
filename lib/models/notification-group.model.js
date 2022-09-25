'use-strict';
const {Sequelize} = require('sequelize');
const {NOTIFICATION_GROUP_STATUS} = require('../constant');

module.exports = (sequelize) => {
    return sequelize.define('NotificationGroup', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status:{
            type: Sequelize.ENUM(NOTIFICATION_GROUP_STATUS.ACTIVE, NOTIFICATION_GROUP_STATUS.INACTIVE),
            allowNull: false,
            default: NOTIFICATION_GROUP_STATUS.ACTIVE
        }
    }, {
        tableName: 'notification_groups',
        timestamps: true
    });
};
