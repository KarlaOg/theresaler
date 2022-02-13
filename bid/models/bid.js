'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bid.init({
    priceOffer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idBidValidated: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
  },
    {
      sequelize,
      modelName: 'Bid',
    });
  return Bid;
};