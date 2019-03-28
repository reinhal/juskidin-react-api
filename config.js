'use strict';
require('dotenv').config();
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ||'http://localhost:3000';
exports.DATABASE_URL = process.env.DATABASE_URL;
