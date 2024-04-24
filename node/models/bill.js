'use strict';
const {
  Model
} = require('sequelize');
const utils = require("../utils/generateUUID");

module.exports = (sequelize, DataTypes) => {
  class bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bill.init({
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
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contactNumber: {
      allowNull: false,
      type: DataTypes.STRING(10)
    },
    paymentMethod: {
      allowNull: false,
      type: DataTypes.STRING
    },
    total: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'bill',
    timestamps: true
  });
  return bill;
};