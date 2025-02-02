const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 8080;
const HOST = process.env.NODE_ENV === 'production'
    ? 'https://cse341-contacts-rl68.onrender.com'
    : `localhost:${PORT}`;

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: HOST
};

const outputFile = './swagger-output.json';
const routes = ['../server.js'];

swaggerAutogen(outputFile, routes, doc);