const routes = require('express').Router();
const billController = require('../controllers/bill');

routes.post('', billController.addBill);
routes.get('', billController.generateBill);
routes.delete('', billController.deleteBill);
routes.get('/all', billController.getAllBills);

module.exports = routes;