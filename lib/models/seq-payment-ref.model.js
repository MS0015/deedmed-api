'use-strict';

const {Sequelize} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('SeqPaymentRef', {
        date: {
            type: Sequelize.DATEONLY,
            primaryKey: true
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        tableName: 'seq_payment_ref',
        timestamps: false,
        engine: 'MYISAM'
    });
};