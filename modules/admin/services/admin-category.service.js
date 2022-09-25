'use strict';
const StorageService = require('../../../lib/services/storage-service');
const AdminCategoryRepository = require('../repositories/admin-category.repository');
const s3 = new StorageService();
const fs = require('fs');
const SECRET_CONFIGS = require('../../../secret-config');
const AWS_S3_BUCKET_SYSTEM_FILES = SECRET_CONFIGS.AWS_S3_BUCKET_SYSTEM_FILES;
const { v4: uuid } = require('uuid');
const { AWS_S3_EXPIRES } = require('../../../lib/constant');

class AdminCategoryService {
  static async create(userId, name, file) {
    try {
      const categoryId = uuid();
      const key = 'category-icons/' + categoryId + '.' + file.mimetype.split('/')[1];
      const imageBuffer = new Buffer.from(fs.readFileSync(file.path).toString('base64'), 'base64');
      const uploadResult = await s3.upload(AWS_S3_BUCKET_SYSTEM_FILES, key, imageBuffer);
      fs.unlinkSync(file.path);
      const category = {
        categoryId,
        name,
        iconKey: uploadResult.key,
        createdBy: userId,
        updatedBy: userId,
      }
      await AdminCategoryRepository.create(category);
      return Promise.resolve({ categoryId });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll() {
    try {
      const categories = await AdminCategoryRepository.getAll();
      const newCategories = [];
      for (const category of categories) {
        const key = category.iconKey;
        category.iconKey = await s3.getSignedUrl(AWS_S3_BUCKET_SYSTEM_FILES, key, 'getObject', AWS_S3_EXPIRES.SYSTEM_FILES);
        newCategories.push(category);
      }
      return Promise.resolve(newCategories);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AdminCategoryService;
