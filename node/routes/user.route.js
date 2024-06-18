const routes = require('express').Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { isAdmin } = require("../middlewares/isAdmin");
const { upload } = require("../middlewares/fileUpload");

routes.post('/login', userController.login);
routes.post('/signup', userController.signup);
routes.get('/getAllUsers', verifyToken, isAdmin, userController.getAllUsers);
routes.post('/forgotPassword', verifyToken, userController.forgetPassword);
routes.post('/addUserByAdmin', verifyToken, isAdmin, upload.single('cmsFiles'), userController.addUserByAdmin);

module.exports = routes;