const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res, next) {
  res.render('home', { layout: false });
});

// set our port
app.set('port', process.env.PORT || 3000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`listening on port ${server.address().port}`);
});

module.exports = server;