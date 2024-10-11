import fs from 'fs';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GenKiKoi API',
      version: '1.0.0',
      description: 'API documentation for GenKiKoi service',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/controllers/*.ts', './src/types/*.ts'], // Include both controllers and types
};

// Log các file được tìm thấy
const controllersPath = path.join(__dirname, 'controllers');
const routesPath = path.join(__dirname, 'routes');

console.log('Controllers found:');
fs.readdirSync(controllersPath).forEach(file => {
  console.log(file);
});

console.log('Routes found:');
fs.readdirSync(routesPath).forEach(file => {
  console.log(file);
});

const specs = swaggerJsdoc(options);
console.log('Swagger specs generated:', JSON.stringify(specs, null, 2));

export { specs, swaggerUi };
