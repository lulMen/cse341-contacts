const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 8080;

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: `localhost:${PORT}`
};

const outputFile = './swagger-output.json';
const routes = ['../server.js'];

swaggerAutogen(outputFile, routes, doc);