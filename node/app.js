const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allRoutes = require('./routes/all.route');
app.use('/', allRoutes);

const port = process.env.CMS_PORT;
const host = process.env.CMS_HOST;

app.listen(port, () => {
    console.log(`Server is running on port ${host}:${port}`);
});