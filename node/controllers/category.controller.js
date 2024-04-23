const db = require("../models");
const { resFound, resServerError, resDocCreated, resDocUpdated, resErrorOccured } = require("../utils/response");

const createCategory = async(req, res) => {
    try {
        let doc = await db.category.create(req.body);
        return resDocCreated(res, doc);        
    } catch (error) {
        return resServerError(res, error);
    }
};

const getAllCategory = async(req, res) => {
    try {
        let doc = await db.category.findAll();
        return resFound(res, doc);
    } catch (error) {
        return resServerError(res, error);
    }
};

const updateCategory = async(req, res) => {
    try {
        let { id } = req.query;
        let doc = await db.category.update(req.body, {
            where: {
                id,
            }
        });
        if(doc.length > 0) return resDocUpdated(res, doc);
        return { statusCode: 203, statusMessage: "Document Not Updated!" };
    } catch (error) {
        return resServerError(res, error);
    }
};

module.exports = {
    getAllCategory,
    createCategory,
    updateCategory
};