const routes = require('express').Router();
const user = require('./user.route');
const category = require('./category.route');
const product = require('./product.route');
const bill = require('./bill');
const dashboard = require('./dashboard');

routes.use('/user', user);
routes.use('/category', category);
routes.use('/product', product);
routes.use('/bill', bill);
routes.use('/dashboard', dashboard);

module.exports = routes;