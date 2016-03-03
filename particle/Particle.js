var Particle = require('particle-api-js');

var deviceId = '53ff71066667574827382467';
var token = '8949c6593b9a5f289e0c9b632270c4b29cd97cd1';

function logIn (user, pass, callback) {
  var particle = new Particle();
  particle.login({username: user, password: pass}).then(
    function(data){
      callback(null, data);
    },
    function(err){
      console.log('An error occured while logging in: ' + err);
    }
  );
}

function getLightLevel (callback) {
  var particle = new Particle();
  particle.getVariable({ deviceId: deviceId, name: 'lightReading', auth: token }).then(
    function(data){
      var value = data.body['result'];
      callback(null, value);
    }, 
    function(err) {
        console.log('An error occurred while getting attrs:', err);
        callback(err);
    }
  );
}

function lightOn (callback) {
  var particle = new Particle();
  var fnPr = particle.callFunction({ deviceId: '53ff71066667574827382467', name: 'light', argument: 'on', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' });
  
  fnPr.then(
    function(data) {
      callback(null, data);
      console.log('Function called succesfully:', data);
    }, 
    function(err) {
      console.log('Function: An error occurred:', err);
    }
  );
}

function lightOff (callback) {
  var particle = new Particle();
  var fnPr = particle.callFunction({ deviceId: '53ff71066667574827382467', name: 'light', argument: 'off', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' });
  fnPr.then(
    function(data) {
      callback(null, data);
      console.log('Function called succesfully:', data);
    }, 
    function(err) {
      console.log('Function: An error occurred:', err);
    }
  );
}

module.exports = {
  logIn: logIn,
  getLightLevel: getLightLevel,
  lightOn: lightOn,
  lightOff: lightOff 
};