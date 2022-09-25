'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('pharmacies', 'maxDeliveryDistance', {
          type: Sequelize.DataTypes.DOUBLE
        }, { transaction: t }),
        queryInterface.changeColumn('pharmacies', 'description', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
      ]);
    });

  },

  async down(queryInterface, Sequelize) {

  }
};
