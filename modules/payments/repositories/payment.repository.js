'use-strict';

const { models: { Payment, SeqPaymentRef } } = require('../../../lib/models/index');

class PaymentRepository {
    
    static async insertSeq(data) {
        try {
            const result = await SeqPaymentRef.create(data);
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    } 

    static async createPayment(data) {
        try {
            const result = await Payment.create(data);
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async getPaySecHash(secHash) {
        try {
            const result = await Payment.findOne({'paySecHash': secHash});
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async update(txn_ref, data) {
        try {
          const result = await Payment.update(data, { where: { txn_ref } });
          console.log('u', result);
          return Promise.resolve(result);
        } catch (err) {
          return Promise.reject(err);
        }
      }
}

module.exports = PaymentRepository;