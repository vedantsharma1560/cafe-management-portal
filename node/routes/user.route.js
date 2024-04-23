const routes = require('express').Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { isAdmin } = require("../middlewares/isAdmin");

routes.post('/login', userController.login);
routes.post('/signup', verifyToken, userController.signup);
routes.get('/getAllUsers', verifyToken, isAdmin, userController.getAllUsers);
routes.post('/forgotPassword', verifyToken, userController.forgetPassword);

module.exports = routes;