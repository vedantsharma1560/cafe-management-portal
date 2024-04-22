'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'local';
const config = require('../config/config.js')[env];
const db = {};

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to ${process.env.DBNAME}..`);
  })
  .catch(err => {
    console.error('Error authenticating Sequelize:', err);
  });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user")(sequelize, DataTypes);

module.exports = db;
