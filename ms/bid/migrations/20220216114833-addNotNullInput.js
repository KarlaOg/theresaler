'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     return Promise.all([
      queryInterface.removeColumn('Bets', 'priceOffer'),
      queryInterface.removeColumn('Bets', 'userId'),
      queryInterface.removeColumn('Bets', 'productId'),
      queryInterface.removeColumn('Bets', 'isBetValidated')
    ]);
  }
};
