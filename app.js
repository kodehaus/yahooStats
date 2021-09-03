const express = require('express');
const exphbs = require('express-handlebars');
const https = require('https');
const http = require('http');
const fs = require('fs');
const Cookies = require('cookies');

const serverConfig = require('./config');
const YahooFantasy = require('yahoo-fantasy');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


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

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

function refreshToken(paramA, paramB){
  console.log('loggin the refresh token: ')
  console.log('refresh token');
}

// set up the yahoo ff module
const yf = new YahooFantasy(
  serverConfig.yahooAppKey, // Yahoo! Application Key
  serverConfig.yahooAppSecret, // Yahoo! Application Secret
  refreshToken, // callback function when user token is refreshed (optional)
  serverConfig.yahooRedirectUrl // redirect endpoint when user authenticates (optional)
);

//create the http service
const server = http.createServer(app);

//create the https service
const httpsServer = https.createServer(options, app);


//start the http service
server.listen(serverConfig.port, function(){
  console.log(`listening on port ${server.address().port}`);
  console.log(`${serverConfig.yahooRedirectUrl}`);
});

//start the https service
httpsServer.listen(serverConfig.httpsPort, function() {
  console.log(`Https server listening on port: ${httpsServer.address().port}`);
})

function transferCredentials(responseObj){
  const curDateTime = new Date();
  const accessObj = {};
    accessObj.access_token = responseObj.access_token; 
    accessObj.refresh_token = responseObj.refresh_token;
    accessObj.expires_in = dt.addSeconds(curDateTime, responseObj.expires_in); //3600;
    accessObj.token_type = responseObj.token_type; //'bearer';
    return accessObj;
}

// Yahoo auth route
app.get('/auth/yahoo', (req, res) => {
  // if the user is not authenticated call the yahoo auth function to load the yahoo login page
  yf.auth(res);
});

// Yahoo call back route
app.get("/auth/yahoo/callback", (req, res) => {
  yf.authCallback(req, refreshToken);
//   console.log(JSON.stringify(yahooFantasy));
  res.redirect('/');
  res.end();
  // app.yahooFantasy.authCallback(req, (err) => {
  //   if (err) {
  //     return res.redirect("/error");
  //   }
  //   return res.redirect("/");
  // });
});

app.get('/', function (req, res, next) {
  res.render('home');
});

module.exports = server;