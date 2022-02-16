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
    priceOffer: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },

    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    productId: {
      allowNull: false,
      type: DataTypes.STRING
    },

    isBetValidated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Bet',
  });
  return Bet;
};