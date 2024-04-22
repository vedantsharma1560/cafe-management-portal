let path = require("path");
let fixture = path.join(__dirname, "../.env");
let dotenv = require('dotenv').config({ path: fixture });
let config = dotenv.parsed;     //without this line .env is not loaded in your app.js and port and host become undefined

module.exports = {
    local: {
        username: process.env.DBUSERNAME ? process.env.DBUSERNAME : config?.DBUSERNAME,
        password: process.env.DBPASSWORD ? process.env.DBPASSWORD : config?.DBPASSWORD,
        database: process.env.DBNAME ? process.env.DBNAME : config?.DBNAME,
        host: process.env.DBHOST ? process.env.DBHOST : config?.DBHOST,
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000,
        },
    },
    development: {
        username: process.env.DBUSERNAME ? process.env.DBUSERNAME : config?.DBUSERNAME,
        password: process.env.DBPASSWORD ? process.env.DBPASSWORD : config?.DBPASSWORD,
        database: process.env.DBNAME ? process.env.DBNAME : config?.DBNAME,
        host: process.env.DBHOST ? process.env.DBHOST : config?.DBHOST,
        port: 3306,
        dialect: 'mysql',
        // ssl:true,
        // dialectOptions: {
        //     bigNumberStrings: true,
        //     ssl: {
        //         ca: ca,
        //     }
        // },
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000,
        },
    },
};