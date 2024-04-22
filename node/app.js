const express = require('express');
const app = express();
require('dotenv').config();             //without this line .env is not loaded in your app.js and port and host become undefined

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.CMS_PORT;
const host = process.env.CMS_HOST;

app.listen(port, () => {
    console.log(`Server is running on port ${host}:${port}`);
});