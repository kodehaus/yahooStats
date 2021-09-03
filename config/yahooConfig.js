
const YahooFantasy = require('yahoo-fantasy');
const server = require('../app');
const serverConfig = require('../config');

const yf = new YahooFantasy(
  serverConfig.yahooAppKey, // Yahoo! Application Key
  serverConfig.yahooAppSecret, // Yahoo! Application Secret
  serverConfig.yahooAppCallbackFunction, // callback function when user token is refreshed (optional)
  serverConfig.yahooRedirectUrl // redirect endpoint when user authenticates (optional)
);

// you can authenticate a user by setting a route to call the auth function
// note: from v4.0 on, public queries are now supported; that is, you can query
// public resources without authenticating a user (ie/ game meta, player meta,
// and information from public leagues)
