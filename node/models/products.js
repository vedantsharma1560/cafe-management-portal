'use strict';
const {
  Model
} = require('sequelize');
const utils = require("../utils/generateUUID");

module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    id: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      defaultValue: () => {
        const randomId = utils.generateUUID();
        return randomId;
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    billId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: DataTypes.STRING(255),
    price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
    timestamps: true
  });
  return products;
};