const routes = require('express').Router();
const productController = require("../controllers/product.controller");

routes.get('/category', productController.getProductByCategoryId);
routes.post('', productController.addProduct);
routes.get('', productController.getAllProducts);
routes.put('', productController.updateProducts);

module.exports = routes;