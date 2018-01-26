var express = require('express');
var MongoClient = require('mongodb').MongoClient;
const config = require('./server/config/database');

const  URL =  config.uri ;
//var app = express();

var state = {
  db: null,
};


exports.connect = function(URL , done) {
  if (state.db) {
    return done();
  }

  MongoClient.connect(URL, function(err, db) {
    if (err) {
      return done(err);
    }
    state.db = db;
    done();
  });
};

exports.get = function() {
  return state.db;
};

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      if (err) {
        done(err);
      }
    });
  };
}

module.export = MongoClient;


