'use strict';
const FactoryService = require('../factories/factory-service');
const MailgunService = require('../services/mailgun-service');

class EmailService {
  static async sendForgotPasswordEmail(to, code) {
    try {
      const html = await FactoryService.createForgotPasswordHTML({ code });
      const subject = 'Reset Password'
      await MailgunService.sendEmail(to, subject, html);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = EmailService;
