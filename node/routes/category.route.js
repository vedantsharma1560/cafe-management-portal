const routes = require('express').Router();
const categoryController = require("../controllers/category.controller");
const { verifyToken } = require("../middlewares/verifyToken");

routes.post('', verifyToken, categoryController.createCategory);
routes.get('', verifyToken, categoryController.getAllCategory);
routes.put('', verifyToken, categoryController.updateCategory);

module.exports = routes;