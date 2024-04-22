const routes = require('express').Router();
const userController = require("../controllers/user.controller");

routes.post('/login', userController.login);
routes.post('/signup', userController.signup);
routes.get('/getAllUsers', userController.getAllUsers);
routes.post('/forgotPassword', userController.forgetPassword);

module.exports = routes;