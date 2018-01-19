// Set up
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var util = require('util');

// Configuration
mongoose.connect('mongodb://localhost/tables-tactile');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
  'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Models
var Table = mongoose.model('Table', {
  title: String,
  description: String,
  rating: Number
});

// Routes

// Get tables
app.get('/api/tables', function (req, res) {

  console.log("fetching tables");

  // use mongoose to get all tables in the database
  Table.find(function (err, tables) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(tables);
  });
});

// create table and send back all tables after creation
app.post('/api/tables', function (req, res) {


  // create a table, information comes from request from Ionic
  var newTable = new Table(req.body);
  newTable.save()
    .then(item => {
      console.log('table saved');
    })
    .catch(err => {
      console.log('unable to save');
    })
  // get and return all the tables after you create another
 Table.find(function (err, tables) {
    if (err)
      console.log('error Re loaded')
    res.json(tables);
  });

});

// delete a table
app.delete('/api/tables/:table_id', function (req, res, next) {
  Table.remove({
    _id: req.params.table_id
  }, function (err, table) {

  });
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
