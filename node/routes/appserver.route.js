const routes = require('express').Router();
const user = require('./user.route');
const category = require('./category.route');

routes.use('/user', user);
routes.use('/category', category);

module.exports = routes;