'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
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
db.category = require("./category")(sequelize, DataTypes);
db.product = require("./products")(sequelize, DataTypes);
db.bill = require("./bill.js")(sequelize, DataTypes);

db.category.hasMany(db.product, { foreignKey: 'categoryId', as: 'products' });
db.product.belongsTo(db.category, { foreignKey: 'categoryId', as: 'category' });


db.bill.hasMany(db.product, { foreignKey: 'billId', as: 'products' });
db.product.belongsTo(db.bill, { foreignKey: 'billId', as: 'bill' });

db.bill.belongsTo(db.user, { foreignKey: 'createdBy', as: 'billCreatedBy' });

module.exports = db;
