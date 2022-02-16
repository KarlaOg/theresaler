'use strict';
const { faker } = require('@faker-js/faker');

const bets = [...Array(100)].map((bet) => (
  {
    priceOffer: faker.datatype.number(),
    userId : faker.datatype.number(),
    productId: faker.datatype.number(),
    isBetValidated : faker.datatype.boolean(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bets', bets,{});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
