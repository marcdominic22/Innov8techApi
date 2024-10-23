const express = require('express');
const app = express();
const port = 3000;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const packageJson = require('./package.json');
const routes = require('./routes/index');
const ghlRoutes = require('./routes/ghl/index');

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: packageJson.name,
        version: '1.0.0',
        description: 'Simple Express API with Swagger documentation',
        contact: {
          name: 'Developer',
        },
        servers: [
            {
              url: `http://localhost:${port}`, // Dynamic server URL with port
            },
          ],
      },
    },
    apis: ['./routes/*.js','./routes/ghl/*.js'], // Path to the API docs (this file)
  };
  
  // Swagger docs setup
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.use('/api', routes);
  app.use('/ghl', ghlRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});