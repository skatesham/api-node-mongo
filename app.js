require('dotenv-safe').config({
  allowEmptyValues: true
});

// Remove this line, if is not disired new relic report
require('newrelic');

const express = require('express');
const cors = require('cors');

const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

// Configure routes
require('./src/interfaces/routing-module')(app);

// Configure Swagger
require('./src/infrastructure/swagger-ui')(app);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then( () => {
    app.listen(process.env.PORT)
    console.log("App started and db connect. Listen on " + process.env.PORT)
  })
  .catch((err) => console.log(err));