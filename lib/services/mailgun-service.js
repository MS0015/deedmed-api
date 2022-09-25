'use strict';
const SECRET_CONFIGS = require('../../secret-config');
const mailgun = require('mailgun-js')({
  domain: SECRET_CONFIGS.MAILGUN_DOMAIN,
  apiKey: SECRET_CONFIGS.MAILGUN_API_KEY
});

class MailgunService {
  static async sendEmail(to, subject, html) {
    try {
      return await mailgun.messages().send({
        from: SECRET_CONFIGS.SENDER_ADDRESS,
        to,
        subject,
        html
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = MailgunService;
