'use-strict';

const {Sequelize} = require('sequelize');
const {PAYMENT_STATUS, PAYMENT_TXN_STATUS, PAYMENT_TYPE, PAYMENT_MEDIA, PAYMENT_CATEGORY} = require('../constant');

module.exports = (sequelize) => {
    return sequelize.define('Payment', {
        
        txn_ref: {
            type: Sequelize.STRING,
            allowNull: false
        },
        paySecHash: {
            type: Sequelize.UUID,
            allowNull: false
        },
        orderRef: {
            type: Sequelize.UUID,
            allowNull: false
        },
        payType: {
            type: Sequelize.ENUM(PAYMENT_TYPE.FULL,PAYMENT_TYPE.PARTIAL),
            allowNull: false
        },
        payMedia: {
            type: Sequelize.ENUM(PAYMENT_MEDIA.PAYHERE),
            allowNull: false
        },
        txnTime: {
            type: 'TIMESTAMP',
            allowNull: true
        },
        txnStatus: {
            type: Sequelize.ENUM(PAYMENT_TXN_STATUS.SUCCESS, PAYMENT_TXN_STATUS.FAILED),
            allowNull: false,
            defaultValue:PAYMENT_TXN_STATUS.FAILED 
        },
        paymentCategory: {
            type: Sequelize.ENUM(PAYMENT_CATEGORY.APPOINMENT),
            allowNull: false
        },
        thirdpartyRef: {
            type: Sequelize.STRING,
            allowNull: true
        },
        paymentResponse: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        status:{
            type: Sequelize.ENUM(PAYMENT_STATUS.ACTIVE,PAYMENT_STATUS.INACTIVE),
            allowNull: false
        }
    }, {
        tableName: 'payment',
        timestamps: true
    });
};