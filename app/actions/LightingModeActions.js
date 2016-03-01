import alt from '../alt';

var Particle = require('particle-api-js')

var network = require('../network/neuralNetwork').network; 
var predict = require('../network/neuralNetwork').predict;


class LightingModeActions {
  constructor() {
    this.generateActions(
      'getLightSuccess',
      'getLightFail',
      'changeLightingModeSuccess',
      'changeLightingModeFail',
      'updateMode'
    );
  }

  learningMode(mode) {
    //console.log('learningMode action...' + mode);
    //console.log(mode);
    $.ajax({
      type: 'POST',
      url: '/api/lightingmode',
      data: { mode: mode }
    })
      .done((data) => {
        console.log('ajax done');
        this.actions.changeLightingModeSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log('ajax fail');
        this.actions.changeLightingModeFail(jqXhr);
      });
/*
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
      
      console.log('Light Level = ' + l);
      console.log('Day of Week = ' + d);
      console.log('Time Since 1970 = ' + t);
      
      //{ light: 0.02, day: 0.4, time: 0.1456332434279 }
      var result = predict({ light: l, day: d, time: t});

      //console.log(result['off']);
      //console.log(result['on']);

      if (result['on'] > 0.5) {
        var fnPr = particle.callFunction({ deviceId: '53ff71066667574827382467', name: 'light', argument: 'on', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' });
        fnPr.then(
          function(data) {
            console.log('Function called succesfully:', data);
          }, function(err) {
            console.log('Function: An error occurred:', err);
        });
      } else {
        var fnPr = particle.callFunction({ deviceId: '53ff71066667574827382467', name: 'light', argument: 'off', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' });
        fnPr.then(
          function(data) {
            console.log('Function called succesfully:', data);
          }, function(err) {
            console.log('Function: An error occurred:', err);
        });
      }
    }
    */
  }

  manualMode() {
    console.log('manualMode action...');
  }
}

export default alt.createActions(LightingModeActions);