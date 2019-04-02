'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config');

const { router: imageRouter } = require('./models/images');
const jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

app.use(morgan('comomon'));

app.use(
  cors({ 
  origin: CLIENT_ORIGIN 
  })
);

app.use(function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use('/api/images', imageRouter);

app.listen(process.env.PORT || 8080, () => console.log('👍'))