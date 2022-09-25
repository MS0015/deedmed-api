'use-strict';
const { v4: uuid } = require('uuid');
const PaymentRepository = require('../repositories/payment.repository');
const Utils = require('../../../lib/utils');
const {PAYMENT_MEDIA, PAYMENT_STATUS} = require('../../../lib/constant');

class PaymentService {

    static async create(data) {
        try{
            const secHash = this.generateHash();
            const payRef = await this.generatePaymentRef();
            const payload = {
                'paySecHash': secHash,
                'txn_ref': payRef,
                'orderRef': data.orderRef,
                'patientId': data.patientId,
                'txnAmount': data.txnAmount,
                'paymentCategory': data.category,
                'payType':data.payType,
                'payMedia': PAYMENT_MEDIA.PAYHERE,
                'status': PAYMENT_STATUS.ACTIVE
            };
            const payment = await PaymentRepository.createPayment(payload);
            return Promise.resolve({"paySecHash": payment.paySecHash, paymentRef: payment.txn_ref});

        }catch(err){
            return Promise.reject(err);
        }
    }

    static async getPaymentInfo(secHash) {
        try{

        }catch(err){
            return Promise.reject(err);
        }
    }

    static async confirmation(data) {
        try{
    
            const payload = {
                'thirdpartyRef': data.payment_id,
                'paymentResponse': data.status_message,
                'txnDateTime': Utils.getDate(),
                'txnStatus': this.getTxnStatus(data.status_code)
            };
            const payment = await PaymentRepository.update(data.order_id, payload);
            console.log('p', payment);
            return Promise.resolve({"paySecHash": payment.paySecHash, "status": payment.txnStatus});
        }catch(err){
            return Promise.reject(err);
        }
    }

    static async generatePaymentRef() {
        try{
            const seq = await PaymentRepository.insertSeq({date: Utils.getDate()});
            const date = seq.date.replaceAll('-', '');
            const sequence = String(seq.id).padStart(8, '0');
            const reference = `P${date}${sequence}`;
            return reference;
        }catch(err){
            return Promise.reject(err);
        }
    }

    static generateHash() {
        return uuid();
    }

    static getTxnStatus(status) {
        // 2 - success
        // 0 - pending
        // -1 - canceled
        // -2 - failed
        // -3 - chargedback
        switch(status) {
            case 2: return 'Y';
            case -2: return 'N';
            default: return 'N';
        }

    }

}

module.exports = PaymentService;