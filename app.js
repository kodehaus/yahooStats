const express = require('express');
const exphbs = require('express-handlebars');
const https = require('https');
const http = require('http');
const fs = require('fs');

const serverConfig = require('./config');
const YahooFantasy = require('yahoo-fantasy');

const app = express();

//set up the https for ssl call backs
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  requestCert: false,
  rejectUnauthorized: false
};

//setting middleware
app.use(express.static('public'))


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//TODO refactof this file to serve from the styles folder
app.use("/style.css", express.static('style.css')) 


app.tokenCallback = function ({ access_token, refresh_token }) {
  return new Promise((resolve, reject) => {
    // client is redis client
    client.set("accessToken", access_token, (err, res) => {
      // could probably handle this with a multi... 
      // and you know... handle the errors...
      // good thing this is only an example!
      client.set("accessToken", access_token, (err, res) => {
        return resolve();
      })
    })
  });
};
// set up the yahoo ff module
app.yahooFantasy = new YahooFantasy(
  serverConfig.yahooAppKey, // Yahoo! Application Key
  serverConfig.yahooAppSecret, // Yahoo! Application Secret
  serverConfig.yahooAppCallbackFunction, // callback function when user token is refreshed (optional)
  serverConfig.yahooRedirectUrl // redirect endpoint when user authenticates (optional)
);

// start listening on our port
//const server = app.listen(app.get('port'), () => {
//  console.log(`listening on port ${server.address().port}`);
//});

//create the http service
const server = http.createServer(app);

//create the https service
const httpsServer = https.createServer(options, app);


//start the http service
server.listen(serverConfig.port, function(){
  console.log(`listening on port ${server.address().port}`);
});

//start the https service
httpsServer.listen(serverConfig.httpsPort, function() {
  console.log(`Https server listening on port: ${httpsServer.address().port}`);
})


// Yahoo auth route
app.get('/auth/yahoo', (req, res) => {
  // if the user is not authenticated call the yahoo auth function to load the yahoo login page
  app.yahooFantasy.auth(res);
});

// Yahoo call back route
app.get("/auth/yahoo/callback", (req, res) => {
  app.yahooFantasy.authCallback(req, (err) => {
    if (err) {
      return res.redirect("/error");
    }
    return res.redirect("/");
  });
});

app.get('/', function (req, res, next) {
  res.render('home');
});

module.exports = server;