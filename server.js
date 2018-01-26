const express = require('express');
const app = express();
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const methodOverride = require('method-override');
const cors = require('cors');
const util = require('util');
const path = require('path');
//CONFIG
const config = require('./server/config/database');

const authentication = require('./server/routes/authentication')(router);
//MONGO DB
 MongoClient.connect(config.uri, function( err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(config.dbName);
    client.close();
});

const Table = require('./server/models/tables');

/* Configuration MONGOOSE
const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=> {
  if (err) {
    console.log('could NOT connect to DATABASE: ', err);
  } else {
    console.log('Connected to DATABASE: ' + config.db)
  }
});*/

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
app.get("/", (req, res) =>{
res.send('<h1>OK</h1>');
});
// Get tables
app.get('/api/tables', function (req, res) {
  MongoClient.connect(config.uri, function (err, client) {
    assert.equal(null, err);
    console.log("loading tables...");
    const db = client.db(config.dbName);

    fetchingTables(db, function() {
        client.close()
    });
  });
    var fetchingTables = function (db, callback) {
      const collection = db.collection('tables');
      collection.find({}).toArray( function (err, tables) {
        assert.equal( err, null);
        res.json({tables : tables});
      })
    }
});

// create table and send back all tables after creation
app.post('/api/tables', function (req, res) {
MongoClient.connect(config.uri, function(err , client) {
  assert.equal(null, err);
  const db = client.db(config.dbName);
  registerTable(db, function () {
    client.close();
  })
})
var registerTable = function (db, callback) {
  var collection = db.collection('tables');
  collection.insert({
    title: req.body.title,
    description: req.body.description
  }, function (err, result) {
    assert.equal(err, null);
    console.log('Tables inserted into the collection');
  });
  collection.find({}).toArray( function (err, tables) {
    assert.equal(err, null);
    res.json(tables);
  })
}

});

// delete a table
app.delete('/api/tables/:table_id', function (req, res, next) {
  Table.remove({
    _id: req.params.table_id
  }, function (err, table) {

  });
});

app.listen(8080);
console.log("App listening on port 8080");
