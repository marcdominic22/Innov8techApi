const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config');
const packageJson = require('./package.json');

const v1Routes = require('./routes/v1');

app.enable("trust proxy");
app.set("json spaces", 2);

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Access environment variables
const port = config.port;

// const swaggerOptions = {
//     swaggerDefinition: {
//       openapi: '3.0.0',
//       info: {
//         title: 'Innov8Tech API',
//         version: '1.0.0',
//         description: 'Innov8Tech API with Swagger documentation',
//         contact: {
//           name: 'Innov8Tech Dev Team',
//           url: 'https://innov8tech.co', // Optional URL for the contact
//           email: 'dev@innov8tech.com'
//         },
//         version: "v1",
//         servers: [
//             {
//               url: `http://localhost:${port}/v1`, // Dynamic server URL with port
//               description: 'Version 1 of API',
//             },
//           ],
//       },
//     },
//     apis: ['./routes/v1/ghl/*.js'], // Path to the API docs (this file)
//     // apis: ['./routes/**/*.js'], // Path to all the API docs
//   };
  
//   // Swagger docs setup
//   const swaggerDocs = swaggerJsDoc(swaggerOptions);

//   // Serve swagger.json file
//   app.get('/swagger.json', (req, res) => {
//     res.json(swaggerDocs);
//   });

//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
//     explorer: true, // Enable API explorer
//   }));

//   app.get('/', (req, res) => {
//     res.redirect('/api-docs');
//   });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.html'));
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