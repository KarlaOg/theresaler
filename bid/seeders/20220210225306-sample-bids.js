'use strict';
const { faker } = require('@faker-js/faker');

const bids = [...Array(10)].map((bid) => (
  {
    priceOffer: faker.commerce.price(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInscd ert('Bids', bids,{});

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
