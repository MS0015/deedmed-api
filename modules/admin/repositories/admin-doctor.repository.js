'use strict';
const { models: { Doctor, User } } = require('../../../lib/models/index');
const { Op } = require('sequelize');

class AdminDoctorRepository {

  static async getAll(offset, limit, searchText, genderFilter, experienceYearsFilter, serviceCategoriesFilter, serviceAreasFilter) {
    try {
      const where = {};
      if (searchText) {
        where.name = {
          [Op.like]: `%${searchText}%`
        };
      }
      if (genderFilter) {
        where.gender = genderFilter;
      }
      if (experienceYearsFilter) {
        where.experienceYears = experienceYearsFilter;
      }
      if (serviceCategoriesFilter) {
        where.serviceCategories = {
          [Op.like]: `%${serviceCategoriesFilter}%`
        };
      }
      if (serviceAreasFilter) {
        where.serviceAreas = {
          [Op.like]: `%${serviceAreasFilter}%`
        };
      }
      const result = await Doctor.findAll({
        where,
        attributes: {
          exclude: ['UserUserId']
        },
        include: [{
          model: User,
          attributes: {
            exclude: ['password']
          },
        }],
        order: [
          ['createdAt', 'DESC']
        ],
        offset,
        limit
      });
      const dataCount = await this.getAllCount(searchText, genderFilter, experienceYearsFilter, serviceCategoriesFilter, serviceAreasFilter);
      return Promise.resolve({ data: result, dataCount });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllCount(searchText, genderFilter, experienceYearsFilter, serviceCategoriesFilter, serviceAreasFilter) {
    try {
      const where = {};
      if (searchText) {
        where.name = {
          [Op.like]: `%${searchText}%`
        };
      }
      if (genderFilter) {
        where.gender = genderFilter;
      }
      if (experienceYearsFilter) {
        where.experienceYears = experienceYearsFilter;
      }
      if (serviceCategoriesFilter) {
        where.serviceCategories = {
          [Op.like]: `%${serviceCategoriesFilter}%`
        };
      }
      if (serviceAreasFilter) {
        where.serviceAreas = {
          [Op.like]: `%${serviceAreasFilter}%`
        };
      }
      return await Doctor.count({ where });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AdminDoctorRepository;
