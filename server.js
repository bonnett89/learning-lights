require('babel-register');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');
var mongoose = require('mongoose');
var config = require('./config');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var spark = require('spark');
var Light = require('./models/light');
var _ = require('underscore');
var Particle = require('particle-api-js');
const EventEmmitter = require('events');
const util = require('util');

//import methods from neuralNetwork
var predict = require('./neural_net/trained_network/neuralNetwork').predict;

//import methods from particle.js
var particleLogIn = require('./particle/Particle').logIn;
var particleGetLightLevel = require('./particle/Particle').getLightLevel;
var particleLightOn = require('./particle/Particle').lightOn;
var particleLightOff = require('./particle/Particle').lightOff;
var particleGetLightOn = require('./particle/Particle').getLightOn;

var app = express();

// Connect to Mongo Database
mongoose.connect('mongodb://localhost:27017/test');

console.log(config.database);

mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');

});

mongoose.connection.once('open', function() {
  console.info('We are connected');
})

/*
* Particle Section
*/
var token = "8949c6593b9a5f289e0c9b632270c4b29cd97cd1";
var deviceId = '53ff71066667574827382467';
var password = '';
var particle = new Particle();

function logIn() {
  particleLogIn('bonnett89@gmail.com', password , function(err, data){
    if (err) console.error('Error' + err);
    console.log('Data: ' + data.body['access_token']);
  })
}

//logIn();

function getLightLevel() {
  particleGetLightLevel(function(err, data){
    if (err) console.error('Error: ' + err);
    insertLight(data);
  });
}

function insertLight(data) {
  var light = new Light({
    value: data,
    date: new Date(Date.now())
  });
  //console.log(light._id);
  light.save(function(err, light) {
    if(err) return console.error(err);
    console.log('Light reading saved!');
  });
}

function lightOn(){
  particleLightOn(function(err, data){
    if (err) console.error('Error: ' + err);
    console.log('lightOn');
  });
}

function lightOff(){
  particleLightOff(function(err, data){
    if (err) console.error('Error: ' + err);
    console.log('lightOff');
  });
}

function getLightOn(){
  particleGetLightOn(function(err, data){
    if (err) console.error('Error: ' + err);
    //console.log('Data: ' + data);
    return data;
  });
}

function logLightLevel() {
  particle.getVariable({ deviceId: deviceId, name: 'lightReading', auth: token }, 200).then(function(data) {
          //console.log('Device variable retrieved successfully:', data);
          var insertLight = function() {
          var light = new Light({
            value: data.body['result'],
            date: new Date(Date.now())
          });
          //console.log(light._id);
          light.save(function(err, light) {
            if(err) return console.error(err);
            console.log('Light reading saved!')
          });
        }
        insertLight();
        callback(null);
        }, function(err) {
        console.log('An error occurred while getting attrs:', err);
        callback();
        });
}

function learningMode() {
  var particle = new Particle();

  particleGetLightLevel(function(err, data){
    if (err) console.error('Error: ' + err);
    getDate(data);
  });
      
  function getDate(l) {
    var lightLevel = l / 1000;
    //console.log(lightLevel);
    var d = new Date(Date.now())
    //console.log(d);

    var dayOfWeek = d.getDay() / 10;
    var timeInMs = d.getTime() / 10000000000000;

    getPrediction(lightLevel, dayOfWeek, timeInMs);
  }

  function getPrediction(l,d,t) {
    
    console.log('Light Level = ' + l * 1000);
    //console.log('Day of Week = ' + d);
    //console.log('Time Since 1970 = ' + t);
    
    //{ light: 0.02, day: 0.4, time: 0.1456332434279 }
    var result = predict({ light: l, day: d, time: t});

    //console.log('OFF: ' + result['off']);
    //console.log('ON: ' + result['on']);

    particleGetLightOn(function(err, data){
      if (err) console.error('Error: ' + err);
      if (result['on'] > 0.5 && data == 0) {
        lightOn();
      }
      if (result['off'] > 0.5 && data == 1) {
        lightOff();
      } 
    });
  }
}

//setInterval(logLightLevel, 4000);

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*
* GET /api/lightinglevels
* retrieve lighting levels from mongo
*/
app.get('/api/lightlevels', function(req, res, next){
  console.log("API CALL MADE");
  var params = req.query;
  var conditions = {};

  _.each(params, function(value, key) {
    conditions[key] = new RegExp('^' + value + '$', 'i');
  });

  Light
    .find(conditions)
    .sort({date: 'descending'})
    .limit(100)
    .exec(function(err, lights){
      if (err) return next(err);
      res.send(lights);
    });
});

/*
* POST /api/lightingMode
* change the lighting mode of the system
*/
var intervalId;

app.post('/api/lightingmode', function(req, res, next) {
  var mode = req.body.mode;
  console.log(req.body.mode);
  //console.log('Mode: ' + mode);
  try {
    if (mode == 'learning') {
      intervalId = setInterval(learningMode, 10000);
      res.send( { message: mode + ' has been activated!'});
    } else {
      clearInterval(intervalId);
      res.send( { message: 'manual mode has been activated!'});
    }
  } catch (e) {
    return res.status(400).send({ message: 'Lighting Mode Error'});
  }
});

/*
* POST /api/lightstate
* change the light state of a light
*/
app.post('/api/lightstate', function(req, res, next) {
  var lightState = req.body.lightState;
  console.log(req.body.lightState);
  //console.log('Mode: ' + mode);
  try {
    if (lightState == 'on') {
      particleLightOn();
      res.send( { message: 'Light has been set to ' + lightState });
    } else {
      particleLightOff();
      res.send( { message: 'Light has been set to ' + lightState });
    }
  } catch (e) {
    return res.status(400).send({ message: 'Lighting State Error'});
  }
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
