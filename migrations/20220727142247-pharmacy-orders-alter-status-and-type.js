'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('pharmacy_orders', 'status', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        }, { transaction: t }),
        queryInterface.changeColumn('pharmacy_orders', 'type', {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        }, { transaction: t }),
      ]);
    });

  },

  async down(queryInterface, Sequelize) {

  }
};
