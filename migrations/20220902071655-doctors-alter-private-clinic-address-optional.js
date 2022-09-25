
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.changeColumn('doctors', 'privateClinicAddress', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
      ]);
    });

  },

  async down(queryInterface, Sequelize) {

  }
};
