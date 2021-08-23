const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//setting middleware
app.use(express.static('public'))


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//TODO refactof this file to serve from the styles folder
app.use("/style.css", express.static('style.css')) 
app.get('/', function (req, res, next) {
  res.render('home');
});

// set our port
app.set('port', process.env.PORT || 3000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`listening on port ${server.address().port}`);
});

module.exports = server;