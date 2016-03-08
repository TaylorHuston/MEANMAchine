//Grab things
var express = require('express'),
    app = express(),
    path = require('path');

//Set up public folder
app.use(express.static(__dirname + '/public'));

//Set up route for index file
app.get('*', function(req, res) {
  res.sendFile(path,joise(__dirname + '/public/views/index/html'));
});

//Start server
app.listen(8080);
console.log("Running on port 8080");
