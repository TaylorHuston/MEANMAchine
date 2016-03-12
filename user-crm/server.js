//***SETUP***
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  config = require('./config'),
  path = require('path'),
  apiRoutes = require('./app/routes/api')(app, express);

//Use body parser to grab information from POST requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//CORS requests
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
  next();
});

//Log all requests to console
app.use(morgan('dev'));

//Connect to DB
mongoose.connect(config.database);

//Static files location
app.use(express.static(__dirname + '/public'));

//API routes
app.use('/api', apiRoutes);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//Start server
app.listen(config.port);
console.log("Live at localhost " + config.port);
