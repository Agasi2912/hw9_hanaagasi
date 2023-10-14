// Module-module
const express = require("express");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require("morgan");
const apiRoutermovies = require("./routers/movies.js");
const apiRouterusers = require("./routers/users.js");
const authenticationMiddleware = require("./authmiddleware/authmiddleware.js")
const port = 3000;
const options = {
	definition: {
	  openapi: '3.0.0',
	  info: {
		title: 'Express API with swagger',
		version: '0.1.0',
		description:
		  'This is a simple CRUD API application mode with Express and documented with swagger'
	  },
	  servers: [
		{
		  url: 'http://localhost:3000',
		},
	  ],
	},
	apis: ['./routers/*'],
  };
  
  const specs = swaggerJsdoc(options);


//  Application middleware
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gunakan router API
app.use("/api", apiRoutermovies);
app.use("/api", apiRouterusers);
app.use("/api", authenticationMiddleware);

// Gunakan morgan
app.use(morgan("combined"));

// Lokasi Port
app.listen(port, () => {
	console.log(`Aplikasi berjalan di port ${port}`);
});