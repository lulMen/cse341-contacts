const express = require('express');
const MongoClient = require('../db/connection');
const Router = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../src/docs/swagger-output.json');

const PORT = process.env.PORT || 8080;

var app = express();
app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/contacts', Router)
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const startServer = async () => {
    try {
        const db = await MongoClient.initDb();
        console.log('Application is ready to use the DB:', db.databaseName);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error(`Error initializing DB: ${err.message}`);
    }
};

startServer();