// config.js
const dotenv = require('dotenv');
const result = dotenv.config();
module.exports = {
  port: process.env.HOST_PORT,
  hostUrl: process.env.HOST_URL
};