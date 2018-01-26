const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



module.exports = (router) => {

  router.post('/sign', function (req, res, next) {
      MongoClient.connect(config.uri, function (err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(config.dbName);

      registerUser(db, function() {
          client.close()
      })
    })
    var registerUser = function (db, callback) {
    
          var collection = db.collection('users');
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(req.body.password, salt);
          collection.insert({
            username: req.body.username,
            password: hash
          }, function(err, result) {
              assert.equal(err, null);
              console.log("Inserted into the collection");
              res.json(result);
              
          });
        
      }
    
  });

  router.post('/login', function(req, res, next){
      console.log(req.body);
    MongoClient.connect(config.uri, function (err, client) {
      assert.equal(null, err);
      console.log("verify user");
      const db = client.db(config.dbName);

      loginUser(db, function() {
          client.close()
      });
    })
      var loginUser = function (db, callback) {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(req.body.password, salt);
          var collection = db.collection('users');
          collection.find({ username: req.body.username}).toArray(function (err, data) {
            var pass = req.body.password;
            assert.equal(err, null);
            if((bcrypt.compareSync(pass, data[0].password) === true) && (req.body.username === data[0].username)) {
                res.json({success: true, data});
            } else {
                console.log('ERROR');
            }
        })
      }
  })


  return router;
}
