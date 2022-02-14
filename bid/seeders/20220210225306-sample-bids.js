'use strict';
const { faker } = require('@faker-js/faker');

<<<<<<< HEAD
const bets = [...Array(10)].map((bet) => (
  {
    priceOffer: faker.datatype.number(),
    userId : faker.datatype.number(),
    productId: faker.datatype.number(),
    isBetValidated : faker.datatype.boolean(),
=======
const bids = [...Array(10)].map((bid) => (
  {
    priceOffer: faker.commerce.price(),
>>>>>>> 243d9f1b710248773eb0d067390d8d27d403217f
    createdAt: new Date(),
    updatedAt: new Date()
  }
))
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.bulkInsert('Bets', bets,{});
=======
    await queryInterface.bulkInscd ert('Bids', bids,{});
>>>>>>> 243d9f1b710248773eb0d067390d8d27d403217f

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
