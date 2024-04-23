'use strict';
const {
  Model
} = require('sequelize');
const utils = require("../utils/generateUUID");

module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  categories.init({
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
    }
  }, {
    sequelize,
    modelName: 'categories',
    timestamps: true
  });
  return categories;
};