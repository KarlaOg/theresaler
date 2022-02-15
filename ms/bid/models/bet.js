'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bet.init({
    priceOffer: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    productId: DataTypes.STRING,
    isBetValidated: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Bet',
  });
  return Bet;
};