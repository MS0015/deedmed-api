'use strict';
const { models: { Patient, User } } = require('../../../lib/models/index');
const { Op } = require('sequelize');

class AdminPatientRepository {

  static async getAll(userTypes, offset, limit, searchText) {
    try {
      const options = {
        attributes: {
          exclude: ['UserUserId']
        },
        include: [{
          model: User,
          where: {
            userType: userTypes,
          },
          attributes: {
            exclude: ['password']
          },
        }],
        order: [
          ['createdAt', 'DESC']
        ],
        offset,
        limit
      };
      if (searchText) {
        options.where = {
          name: {
            [Op.like]: `%${searchText}%`
          }
        };
      }
      const result = await Patient.findAll(options);
      const dataCount = await this.getAllCount(userTypes, searchText);
      return Promise.resolve({ data: result, dataCount });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllCount(userTypes, searchText) {
    try {
      const options = {
        include: [{
          model: User,
          where: {
            userType: userTypes,
          },
        }],
      };
      if (searchText) {
        options.where = {
          name: {
            [Op.like]: `%${searchText}%`
          }
        };
      }
      return await Patient.count(options);
    } catch (err) {
      return Promise.reject(err);
    }
  }


}

module.exports = AdminPatientRepository;
