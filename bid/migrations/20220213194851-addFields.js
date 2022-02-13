'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn("Bids", "productId",
          { type: Sequelize.DataTypes.STRING, allowNull: false },
          { transaction: t }

        ),
        queryInterface.addColumn("Bids", "idBidValidated",
          { type: Sequelize.DataTypes.BOOLEAN, allowNull: true },
          { transaction: t }

        ),


      ])

    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
