'use strict';
const {
  Model
} = require('sequelize');
const utils = require("../utils/generateUUID");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      defaultValue: () => {
        const randomId = utils.generateUUID();
        return randomId;
      },
    },
    firstName: DataTypes.STRING(15),
    lastName: DataTypes.STRING(15),
    password: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    contactNumber: DataTypes.STRING(19),
    status: {type: DataTypes.STRING(15), defaultValue: 'false'},
    role: DataTypes.STRING(15)
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true
  });
  return user;
};