const config = require("../config/config");
const { resNotFound, resErrorOccured } = require("../utils/response");
const jwt = require('jsonwebtoken');
const db = require("../models");
let secretKey = config.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return resNotFound(res, "Please Provide the token!");
    jwt.verify(token, secretKey, async (err, user) => {
        if(err) return resErrorOccured(res, err);
        let userPayload = jwt.decode(token);
        let userData = await db.user.findByPk(userPayload.userId);
        if(userPayload.userId === userData.id) {
            req.userPayload = userPayload;
            next();
        }
        else return res.status(401).json({ statusCode: 401, statusMessage: "You don't have access to this API!", error: "invalid-access" });
    });
};

module.exports = {
    verifyToken,
}