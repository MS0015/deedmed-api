'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('pharmacies', 'serviceArea', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        }, { transaction: t }),
      ]);
    });

  },

  async down(queryInterface, Sequelize) {

  }
};
