const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Products API',
            version: '1.0.0',
            description: 'RESTful API for pizza and ingredient management (SQLite, Express).'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local dev server' }
        ]
    },
    apis: [
        path.join(__dirname, '../pizza/routes/*.js'),
        path.join(__dirname, '../ingredient/routes/*.js')
    ]
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
