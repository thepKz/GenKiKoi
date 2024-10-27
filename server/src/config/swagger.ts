import swaggerAutogen from 'swagger-autogen';


const doc = {
  info: {
    title: 'GenKiKoi API',
    description: 'API documentation for GenKiKoi service',
    version: '1.0.0'
  },
  servers: [
    {
      url: process.env.API_URL || 'http://localhost:5000',
      description: 'Development server'
    }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  definitions: {
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/*.ts']; // đường dẫn tới các file routes

swaggerAutogen()(outputFile, endpointsFiles, doc);