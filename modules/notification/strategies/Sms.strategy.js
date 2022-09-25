'use-strict';

const SmsService = require('../../../lib/services/sms-service');
class Sms {
    static async sendToGateway(notification) {
        await SmsService.sendSMS(notification.mobile, notification.message);
    }
}

module.exports = Sms;