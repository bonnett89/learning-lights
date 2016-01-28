var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var spark = require('spark');

//DB Stuff
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

//MORE DB STUFF
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/nodetest1';

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//db accesible to router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

//Spark Core Section
var token = "";

spark.on('login', function() {

  spark.getEventStream('Light', '53ff71066667574827382467', function(data) {
    console.log("Event: " + data['data'] + " from core: " + data['coreid']);
    var insertLight = function(db, callback) {
      db.collection('lightlevel').insertOne( {
        "value" : data['data'],
        "date" : new Date(Date.now())
      }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted lightlevel into collection.");
        callback(result);
      });
    };
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      insertLight(db, function() {
      db.close();
      });
    });
  });
});

spark.login({ accessToken: token});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
