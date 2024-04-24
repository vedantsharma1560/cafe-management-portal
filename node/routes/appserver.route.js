const routes = require('express').Router();
const user = require('./user.route');
const category = require('./category.route');
const product = require('./product.route');
const bill = require('./bill');

routes.use('/user', user);
routes.use('/category', category);
routes.use('/product', product);
routes.use('/bill', bill);

module.exports = routes;