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

var network = require('./app/network/neuralNetwork').network; 
var predict = require('./app/network/neuralNetwork').predict;

var app = express();


mongoose.connect('mongodb://localhost:27017/test');

console.log(config.database);

mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');

});

mongoose.connection.once('open', function() {
  console.info('We are connected');
})

//Spark Section
var token = "8949c6593b9a5f289e0c9b632270c4b29cd97cd1";
var deviceId = '53ff71066667574827382467';
/*
spark.on('login', function() {

  spark.getEventStream('lightReading', '53ff71066667574827382467', function(data) {
    console.log("Event: " + data['data'] + " from core: " + data['coreid']);
    var insertLight = function() {
      var light = new Light({
        value: data['data'],
        date: new Date(Date.now())
      });
      light.save(function(err, light) {
        if(err) return console.error(err);
        console.log('Light reading saved!')
      });  
    }
    insertLight();
  });
});
*/
var particle = new Particle();
/*
particle.getEventStream({ deviceId: deviceId, name: 'lightReading', auth: token}).then(function(data){
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
  });
*/
//spark.login({ accessToken: token});
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

      particle.getVariable({ deviceId: '53ff71066667574827382467', name: 'lightReading', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' }).then(function(data) {
        //console.log('Device variable retrieved successfully:', data);
        var lightLevel = data.body['result'];
        //console.log(lightLevel);
        getDate(lightLevel);
      }, function(err) {
      console.log('An error occurred while getting attrs:', err);
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

        console.log('OFF: ' + result['off']);
        console.log('ON: ' + result['on']);

        if (result['on'] > 0.5) {
          var fnPr = particle.callFunction({ deviceId: '53ff71066667574827382467', name: 'light', argument: 'on', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' });
          fnPr.then(
            function(data) {
              //console.log('Function called succesfully:', data);
            }, function(err) {
              console.log('Function: An error occurred:', err);
          });
        } else {
          var fnPr = particle.callFunction({ deviceId: '53ff71066667574827382467', name: 'light', argument: 'off', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' });
          fnPr.then(
            function(data) {
              //console.log('Function called succesfully:', data);
            }, function(err) {
              console.log('Function: An error occurred:', err);
          });
        }
      }
}

//setInterval(logLightLevel, 4000);


app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


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
