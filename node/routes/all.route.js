const routes = require('express').Router();
const appRoutes = require("./appserver.route");
const apiVersion = '/api/v2';

routes.use(`${apiVersion}`, appRoutes);

module.exports = routes;
