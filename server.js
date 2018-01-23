const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose'); 
const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const methodOverride = require('method-override');
const cors = require('cors');
const util = require('util');
const path = require('path');

const config = require('./server/config/database');

const authentication = require('./server/routes/authentication')(router);


// Configuration
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=> {
  if (err) {
    console.log('could NOT connect to DATABASE: ', err);
  } else {
    console.log('Connected to DATABASE: ' + config.db)
  }
});

app.use(morgan('dev')); 
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


app.use(express.static('../www/'));
app.use('/authentication', authentication);
// Routes
app.get("/*", (req, res) =>{
res.send('<h1>OK</h1>');
});
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

/*app.post('/api/sign', function (req, res) {
  var newUser = new User(req.body);
  newUser.save()
    .then(item => {
      console.log('User saved');
    })
    .catch(err => {
      console.log('USer unable to save');
    })
  // get and return all the tables after you create another
 User.find(function (err, users) {
    if (err)
      console.log('error Re loaded')
    res.json(users);
  });

});
app.get('/api/login', function (req, res, next) {
  res.send('login');
})*/
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
