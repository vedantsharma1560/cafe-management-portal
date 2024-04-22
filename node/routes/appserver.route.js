const routes = require('express').Router();
const user = require('./user.route');

routes.use('/user', user);

module.exports = routes;