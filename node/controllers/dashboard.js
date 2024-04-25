const db = require("../models");
const { resFound, resServerError } = require("../utils/response");

const dashboardDetails = async(req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 100;
        let catdoc = await db.category.findAndCountAll({
            distinct: true,
            offset: (page - 1) * limit,
            limit: limit,
            include: [
                {
                    model: db.product,
                    as: 'products',
                    include: [
                        {
                            model: db.bill,
                            as: 'bill'
                        }
                    ]
                }
            ]
        });
        return resFound(res, catdoc);  
    } catch (error) {
        return resServerError(res, error);
    }
};

module.exports = {
    dashboardDetails
};