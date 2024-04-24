const ejs = require('ejs');
const pdf = require('html-pdf');
let path = require('path');
let fs = require('fs');
const db = require("../models");
const { resServerError, resDocCreated, resFound, resDocDeleted } = require("../utils/response");

const addBill = async(req, res) => {
    try {
        req.body.createdBy = req.query.userId;
        let doc = await db.bill.create(req.body);
        return resDocCreated(res, doc);        
    } catch (error) {
        return resServerError(res, error);
    }
};

const getAllBills = async(req, res) => {
    try {
        let doc = await db.bill.findAll({
            include: [
                {
                    model: db.product,
                    as: 'products',
                    include: [
                        {
                            model: db.category,
                            as: 'category'
                        }
                    ]
                }
            ]
        });
        return resFound(res, doc);        
    } catch (error) {
        return resServerError(res, error);
    }
};

const generateBill = async (req, res) => {
    try {
        let { id } = req.query;
        let doc = await db.bill.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: db.product,
                    as: 'products',
                }
            ],
        });
        doc = doc.get({ plain: true });
        ejs.renderFile(path.join(__dirname, '../views/bill.ejs'), {products: doc.products, name: doc.name, email: doc.email, contactNumber: doc.contactNumber, paymentMethod: doc.paymentMethod, totalAmount: doc.totalAmount }, (err, results) => {
            if(err) {
                return resServerError(res, err);
            } else {
                let date = (new Date()).toISOString();
                date = (date.split('T'))[0];
                pdf.create(results).toFile('./bills-pdf/'+`${date} ~`+' '+doc.name +'.pdf', function(err, data) {
                    if(err) return resServerError(res, err);
                    else return resDocCreated(res, data);
                });
            }
        });
    } catch (error) {
        return resServerError(res, error);
    }
};

const deleteBill = async(req, res) => {
    try {
        let { id } = req.query;
        let doc = await db.bill.destroy({
            where: {
                id
            }
        });
        return resDocDeleted(res, doc);        
    } catch (error) {
        return resServerError(res, error);
    }
};

module.exports = {
    generateBill,
    addBill,
    getAllBills,
    deleteBill
};