var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/http_server');

//*****Pure Node*****

////Get the HTTP and FIlesysten modules
//var http = require('http'),
//    fs = require('fs');
//
////Create Server
//http.createServer(function (req, res) {
//  res.writeHead(200, {
//    'Content-Type': 'text/html',
//    'Access-Control-Allow-Origin': '*'
//  });
//
//  //Grab the index.html file
//  var readStream = fs.createReadStream(__dirname + '/index.html');
//
//  //Send index file to browser
//  readStream.pipe(res);
//
//
//}).listen(1337);
//
//console.log('Alive at localhost:1337');

//*****Using Express*****

//Load Express
var express = require('express');
var app = express();
var path = require('path');

//Send index.html to browser
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+ '/index.html'));
});

//Routes for Admin section
var adminRouter = express.Router();

//Log each request
adminRouter.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})

//Admin main page. /admin
adminRouter.get('/', function(req, res) {
  res.send('Dashboard');
});

//Admin users page. /admin/users
adminRouter.get('/users', function(req, res) {
  res.send('Users');
});

//Admin user page with params. /admin/users/:name
adminRouter.get('/users/:name', function(req, res){
  res.send('Hello '+req.params.name);
});

//Admin hello page with 'validation'. /hello/:name
adminRouter.param('name', function(req, res, next, name) {
  //Some validation
  console.log("Validating: "  +name);
  
  req.name = name;
  next();
});

adminRouter.get('/hello/:name', function(req,res) {
  res.send('Hello ' + req.name);
})


//Admin posts page. /admin/posts
adminRouter.get('/posts', function(req, res) {
  res.send('Posts');
});

app.use('/admin', adminRouter);

//Shorthand routing
app.route('/login')
  //Login form. /login
  .get(function(req, res) {
    res.send("Login form");
  })
  //Process form. /login
  .post(function(req, res) {
  console.log('Login');
  res.send("Logged In");
});

//Start server
app.listen(1337);
console.log('Alive at localhost:1337');
