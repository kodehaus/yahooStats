// config.js
const dotenv = require('dotenv');
const result = dotenv.config();
module.exports = {
  port: process.env.HOST_PORT,
  hostUrl: process.env.HOST_URL,
  yahooRedirectUrl: process.env.YREDIRECT_BASE_URL + ":" + process.env.HOST_PORT +"/" + process.env.YREDIRECT_BASE_PAGE,
  yahooAppSecret: process.env.YAPPLICATION_SECRET,
  yahooAppKey: process.env.YAPPLICATION_KEY,
  yahooAppCallbackFunction: process.env.YTOKEN_CALLBACK_FUNCTION
};