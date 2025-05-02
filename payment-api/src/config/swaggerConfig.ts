import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Payment API',
    version: '1.0.0',
    description: 'Documentação da API de pagamentos com autenticação via JWT',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/types/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
