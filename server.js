const express = require('express');
const app = express();
const cors = require('cors');
const {CLIENT_ORIGIN, DATABASE_URL} = require('./config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const PORT = process.env.PORT || 8080;

mongoose.Promise = global.Promise;

app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

app.use(express.static('public'));
app.use(express.json());

app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};