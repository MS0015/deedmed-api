'use-strict';
const {Sequelize} = require('sequelize');
const {NOTIFICATION_TEMPALTE_STATUS} = require('../constant');

module.exports = (sequelize) => {
    return sequelize.define('NotificationTemplate', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        template: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status:{
            type: Sequelize.ENUM(NOTIFICATION_TEMPALTE_STATUS.ACTIVE, NOTIFICATION_TEMPALTE_STATUS.INACTIVE),
            allowNull: false,
            defaultValue: NOTIFICATION_TEMPALTE_STATUS.ACTIVE
        }
    }, {
        tableName: 'notification_templates',
        timestamps: true
    });
};
