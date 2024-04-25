const routes = require('express').Router();
const dashController = require("../controllers/dashboard");

routes.get('', dashController.dashboardDetails);

module.exports = routes;

