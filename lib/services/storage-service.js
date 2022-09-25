'use strict';
const AWS = require('aws-sdk');
const SECRET_CONFIGS = require('../../secret-config');

class StorageService {

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: SECRET_CONFIGS.AWS_ACCESS_KEY_ID,
      secretAccessKey: SECRET_CONFIGS.AWS_SECRET_ACCESS_KEY,
      region: SECRET_CONFIGS.AWS_REGION
    });
  }

  upload(bucket, key, body) {
    try {
      const params = {
        Bucket: bucket,
        Key: key,
        Body: body,
      };
      return this.s3.upload(params).promise();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  getSignedUrl(bucket, key, operation, expires) {
    try {
      const params = {
        Bucket: bucket,
        Key: key,
        Expires: expires
      };
      return this.s3.getSignedUrl(operation, params);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = StorageService;
