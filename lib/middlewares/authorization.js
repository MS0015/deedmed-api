'use strict';
const lodash = require('lodash');
const Utils = require('../utils');
const CustomHttpError = require('../custom-http-error');
const { HTTP_CODES, ERRORS, MESSAGES } = require('../constant');

const authorization = (types) => {
  return (req, res, next) => {
    if (lodash.includes(types, req.user.userType)) {
      next();
    } else {
      Utils.errorResponse(res, new CustomHttpError(HTTP_CODES.FORBIDDEN, ERRORS.AUTHORIZATION_ERROR, MESSAGES.AUTHORIZATION_FAILED));
    }
  }
};

module.exports = authorization;
