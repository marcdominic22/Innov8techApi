const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');

const config = require('./config');
const packageJson = require('./package.json');

const v1Routes = require('./routes/v1');

const routes = require('./routes/v1/index');
const ghlRoutes = require('./routes/v1/ghl/index');

app.use(express.json());
app.use(helmet());

// Access environment variables
const port = config.port;

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Innov8Tech API',
        version: '1.0.0',
        description: 'Innov8Tech API with Swagger documentation',
        contact: {
          name: 'Contact Innov8Tech Dev Team',
        },
        version: "v1",
        paths: {
          "/v1/ghl/sso": {
            "get": {
              "tags": [
                "GHL"
              ],
              "summary": "Retrieve user info from the GHL SSO session",
              "description": "Returns the combined user profile data from the incoming GHL SSO session and your app's back-end.",
              "parameters": [
                {
                  "name": "x-sso-session",
                  "in": "header",
                  "required": "true",
                  "description": "The SSO session key for your app, as returned by the GHL main app.",
                },
              ],
              "responses": {
                "200": {
                  "description": "Successfully retrieved user info",
                  },
                "400": {
                  "description": "Bad Request"
                },
                "401": {
                  "description": "Unauthorized"
                },
                "500": {
                  "description": "Internal Server Error"
                }
              }
            }
                    }
                  },
        servers: [
            {
              url: `http://localhost:${port}/v1`, // Dynamic server URL with port
              description: 'Version 1 API',
            },
          ],
      },
    },
    apis: ['./routes/v1/ghl/*.js'], // Path to the API docs (this file)
  };
  
  // Swagger docs setup
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.get('/', (req, res) => {
    res.redirect('/api-docs');
  });

  app.use('/v1', v1Routes);  // API v1 routes

  app.disable('x-powered-by');

  // custom 404
  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })

  // custom error handler
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
  })

  // const options = {
  //   key: fs.readFileSync('key.pem'),
  //   cert: fs.readFileSync('cert.pem')
  // };

  // https.createServer(app).listen(port, () => {
  //   console.log(`Server running at https://localhost:${port}`);
  // });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });