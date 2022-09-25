'use strict';
const ejs = require('ejs');
const path = require('path');

const render = (filename, data) => {
  return ejs.renderFile(filename, data, {
    async: true
  });
};

class FactoryService {
  static async createTestOrderHTMLFile(data) {
    try {
      const templateDir = path.join(__dirname, 'pdf-templates', 'test-order.ejs');
      const html = await render(templateDir, { data });
      return Promise.resolve(html);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async createPrescriptionHTMLFile(data) {
    try {
      const templateDir = path.join(__dirname, 'pdf-templates', 'prescription.ejs');
      const html = await render(templateDir, { data });
      return Promise.resolve(html);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async createForgotPasswordHTML(data) {
    try {
      const templateDir = path.join(__dirname, 'email-templates', 'forgot-password.ejs');
      const html = await render(templateDir, { data });
      return Promise.resolve(html);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = FactoryService;
