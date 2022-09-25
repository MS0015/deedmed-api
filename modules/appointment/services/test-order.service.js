'use strict';
const TestOrderRepository = require('../repositories/test-order.repository');
const { v4: uuid } = require('uuid');
const FactoryService = require('../../../lib/factories/factory-service');
const Utils = require('../../../lib/utils');

class TestOrderService {
  static async create(userId, data) {
    try {
      const testOrderId = uuid();
      const testOrderData = {
        testOrderId,
        ...data,
        createdBy: userId,
        updatedBy: userId,
      };
      await TestOrderRepository.create(testOrderData);
      return Promise.resolve({ testOrderId });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async get(appointmentId) {
    try {
      const result = await TestOrderRepository.get(appointmentId);
      const html = await FactoryService.createTestOrderHTMLFile(result);
      const base64PdfString = await Utils.generatePdf(html);
      return Promise.resolve({base64PdfString});
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = TestOrderService;
