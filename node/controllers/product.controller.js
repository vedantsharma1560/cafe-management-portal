const db = require("../models");
const { resFound, resServerError, resDocCreated, resDocUpdated, resDocDeleted } = require("../utils/response");

const getProductByCategoryId = async(req, res) => {
    try {
        let { categoryId } = req.query;
        let doc = await db.product.findAll({
            where: {
                categoryId
            },
            include: [
                {
                    model: db.category,
                    as: 'category'
                }
            ]
        });
        return resFound(res, doc);
    } catch (error) {
        return resServerError(res, error);
    }
};

const addProduct = async(req, res) => {
    try {
        let doc = await db.product.create(req.body);
        return resDocCreated(res, doc);        
    } catch (error) {
        return resServerError(res, error);
    }
};

const updateProducts = async(req, res) => {
    try {
        let { id } = req.query;
        let doc = await db.product.update(req.body, {
            where: {
                id,
            }
        });
        return resDocUpdated(res, doc);
    } catch (error) {
        return resServerError(res, error);
    }
};

const getAllProducts = async(req, res) => {
    try {
        let doc = await db.product.findAll();
        return resFound(res, doc);        
    } catch (error) {
        return resServerError(res, error);
    }
};

const deleteProduct = async(req, res)=> {
    try {
        let { id } = req.query;
        let doc = await db.product.destroy({
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
    getProductByCategoryId,
    addProduct,
    updateProducts,
    getAllProducts,
    deleteProduct
};