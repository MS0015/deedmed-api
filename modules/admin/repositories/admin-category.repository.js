'use strict';
const { models: { Category } } = require('../../../lib/models/index');

class AdminCategoryRepository {
  static async create(data) {
    try {
      const result = await Category.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll() {
    try {
      const result = await Category.findAll();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AdminCategoryRepository;
