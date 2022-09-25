'use strict';
const { ERRORS, MESSAGES, HTTP_CODES, JWT, LOGGER, ENVS } = require('./constant');
const jwt = require('jsonwebtoken');
const SECRET_CONFIGS = require('../secret-config');
const logger = require('./logger');
const pdf = require('html-pdf');
const bcrypt = require('bcryptjs');

class Utils {
  static successResponse(res, statusCode, message, data) {
    return res.status(statusCode).send({
      statusCode,
      message,
      data,
      error: null
    });
  }

  static errorResponse(res, err) {
    logger.log(LOGGER.ERROR, JSON.stringify(err));
    console.error(err);
    if (err.statusCode) {
      return res.status(err.statusCode).send({
        statusCode: err.statusCode,
        error: err.error,
        message: err.message,
        data: null
      });
    } else if (err.errors && err.errors[0] && err.errors[0].message) {
      return res.status(HTTP_CODES.BAD_REQUEST).send({
        statusCode: HTTP_CODES.BAD_REQUEST,
        error: err.name,
        message: err.errors[0].message,
        data: null
      });
    } else if (err.name) {
      return res.status(HTTP_CODES.SERVER_ERROR).send({
        statusCode: HTTP_CODES.SERVER_ERROR,
        error: ERRORS.SERVER_ERROR,
        message: err.name,
        data: null
      });
    } else {
      return res.status(HTTP_CODES.SERVER_ERROR).send({
        statusCode: HTTP_CODES.SERVER_ERROR,
        error: ERRORS.SERVER_ERROR,
        message: MESSAGES.SOMETHING_WENT_WRONG,
        data: null
      });
    }
  }

  static async generateToken(userId, email, userType, username, parentId) {
    try {
      const opts = {
        expiresIn: JWT.EXPIRES_IN,
        subject: email
      };
      if (JWT.ISSUER) {
        opts.issuer = JWT.ISSUER;
      }
      if (JWT.AUDIENCE) {
        opts.audience = JWT.AUDIENCE;
      }
      const token = jwt.sign({
        userId,
        email,
        userType,
        username,
        parentId
      }, SECRET_CONFIGS.JWT_SECRET, opts);
      return Promise.resolve(token);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static decodeToken(token) {
    return jwt.verify(token, SECRET_CONFIGS.JWT_SECRET);
  }

  static getDate() {
    const date = new Date();
    date.toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      hour12: false,
    });
    return date;
  }

  static isExpiredByMinutes(checkDate, minutes) {
    const dateNow = Utils.getDate();
    return checkDate < dateNow.setMinutes(dateNow.getMinutes() - minutes);
  }

  static generateFourDigitCode() {
    return (SECRET_CONFIGS.APP_ENV === ENVS.LOCAL || SECRET_CONFIGS.APP_ENV === ENVS.DEV || SECRET_CONFIGS.APP_ENV === ENVS.STG) ? SECRET_CONFIGS.TEST_OTP : Math.floor(1000 + Math.random() * 9000);
  }

  static async generatePdf(html) {
    try {
      return new Promise((resolve, reject) => {
        pdf.create(html, {
          format: 'A4'
        }).toBuffer(function (err, res) {
          if (err) {
            reject(err);
          } else {
            const base64PdfString = res.toString('base64');
            resolve(base64PdfString);
          }
        });
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getEncryptedPassword(plainPassword) {
    try {
      const encryptedPassword = await bcrypt.hash(plainPassword, 10);
      return Promise.resolve(encryptedPassword);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async isValidPassword(plainPassword, encryptedPassword) {
    try {
      encryptedPassword = encryptedPassword === null ? '' : encryptedPassword;
      const isValid = await bcrypt.compare(plainPassword, encryptedPassword);
      return Promise.resolve(isValid);
    } catch (err) {
      return Promise.reject(err);
    }
  }


}

module.exports = Utils;
