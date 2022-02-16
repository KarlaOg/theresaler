'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'Bets',
        'priceOffer',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'Bets',
        'userId',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'Bets',
        'productId',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        'Bets',
        'isBetValidated',
        {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false
        }
      ),
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
