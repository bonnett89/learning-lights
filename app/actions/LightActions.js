import alt from '../alt';
var synaptic = require('synaptic');
//var NeuralNet = require('../network/neuralNetwork');

var Particle = require('particle-api-js');
var Network = synaptic.Network;

class LightActions {
  constructor() {
    this.generateActions(
      'getLightSuccess',
      'getLightFail'
    );
  }

  lightOn() {
    console.log("TURN DEM LIGHTS ON");

    var jsonNetwork = { neurons: 
   [ { trace: [Object],
       state: 0,
       old: 0,
       activation: 3,
       bias: 0,
       layer: 'input',
       squash: 'LOGISTIC' },
     { trace: [Object],
       state: 0,
       old: 0,
       activation: 2,
       bias: 0,
       layer: 'input',
       squash: 'LOGISTIC' },
     { trace: [Object],
       state: 0,
       old: 0,
       activation: 1456250519245,
       bias: 0,
       layer: 'input',
       squash: 'LOGISTIC' },
     { trace: [Object],
       state: -30279345962.14461,
       old: -30279314341.111206,
       activation: 0,
       bias: 0.06495126229710876,
       layer: '0',
       squash: 'LOGISTIC' },
     { trace: [Object],
       state: 51890995030.958405,
       old: 51890940840.748955,
       activation: 1,
       bias: 0.07712165168486537,
       layer: '0',
       squash: 'LOGISTIC' },
     { trace: [Object],
       state: -99686472406.62723,
       old: -99686368303.32402,
       activation: 0,
       bias: 0.07750767078250648,
       layer: '0',
       squash: 'LOGISTIC' },
     { trace: [Object],
       state: -112878692944.30945,
       old: -112878575064.20912,
       activation: 0,
       bias: -0.09273742767982185,
       layer: '0',
       squash: 'LOGISTIC' },
     { trace: [Object],
       state: -23843874741.53786,
       old: -23843849841.138824,
       activation: 0,
       bias: 0.013883768580853939,
       layer: '0',
       squash: 'LOGISTIC' },
     { trace: [Object],
       state: 1.7304165889827547,
       old: 1.6995107541413532,
       activation: 0.8494656987950364,
       bias: 0.8560596138398318,
       layer: 'output',
       squash: 'LOGISTIC' } ],
  connections: 
   [ { from: '0', to: '3', weight: -0.07157938359305263, gater: null },
     { from: '0', to: '4', weight: 0.030606427555903787, gater: null },
     { from: '0', to: '5', weight: 0.07280781851150095, gater: null },
     { from: '0', to: '6', weight: 0.01654450604692101, gater: null },
     { from: '0', to: '7', weight: -0.05099672386422754, gater: null },
     { from: '1', to: '3', weight: -0.052583720767870545, gater: null },
     { from: '1', to: '4', weight: -0.06909521711058915, gater: null },
     { from: '1', to: '5', weight: -0.012712200405076146, gater: null },
     { from: '1', to: '6', weight: 0.09258234091103076, gater: null },
     { from: '1', to: '7', weight: -0.039819893520325424, gater: null },
     { from: '2', to: '3', weight: -0.020792676508426672, gater: null },
     { from: '2', to: '4', weight: 0.035633288603276025, gater: null },
     { from: '2', to: '5', weight: -0.0684542055707425, gater: null },
     { from: '2', to: '6', weight: -0.07751323790289462, gater: null },
     { from: '2', to: '7', weight: -0.016373470379039648, gater: null },
     { from: '3', to: '8', weight: -0.02748824469745159, gater: null },
     { from: '4', to: '8', weight: 0.874356975142923, gater: null },
     { from: '5', to: '8', weight: 0.08244918179698288, gater: null },
     { from: '6', to: '8', weight: -0.00479491259902716, gater: null },
     { from: '7', to: '8', weight: -0.011349170375615364, gater: null } ] }

     
    var network = Network.fromJSON(jsonNetwork);
    var result = network.activate([3,2,1456250519245]);
    console.log(result);
    var particle = new Particle();
    /*
    particle.login({username: 'bonnett89@gmail.com', password: 'Jamesb1989'}).then(
      function(data){
        console.log('API call completed on promise resolve: ', data.access_token);
        token = particle.listAccessTokens({username: 'bonnett89@gmail.com', password: 'Jamesb1989'});
        console.log(token);
      },
      function(err) {
        console.log('API call completed on promise fail: ', err);
      }
    );
    */
    var fnPr = particle.callFunction({ deviceId: '53ff71066667574827382467', name: 'light', argument: 'on', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' });

    fnPr.then(
      function(data) {
        console.log('Function called succesfully:', data);
      }, function(err) {
        console.log('Function: An error occurred:', err);
    });

    particle.getVariable({ deviceId: '53ff71066667574827382467', name: 'lightOn', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' }).then(function(data) {
      console.log('Device variable retrieved successfully:', data);
    }, function(err) {
    console.log('An error occurred while getting attrs:', err);
    });
    
  }

  lightOff() {
    console.log("TURN DEM LIGHTS OFF");
    var particle = new Particle();
    var token;
    /*
    particle.login({username: 'bonnett89@gmail.com', password: 'Jamesb1989'}).then(
      function(data){
        console.log('API call completed on promise resolve: ', data.access_token);
        token = particle.listAccessTokens({username: 'bonnett89@gmail.com', password: 'Jamesb1989'});
        console.log(token);
      },
      function(err) {
        console.log('API call completed on promise fail: ', err);
      }
    );
    */
    
    var fnPr = particle.callFunction({ deviceId: '53ff71066667574827382467', name: 'light', argument: 'off', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' });

    fnPr.then(
      function(data) {
        console.log('Function called succesfully:', data);
      }, function(err) {
        console.log('Function: An error occurred:', err);
    });
    

    particle.getVariable({ deviceId: '53ff71066667574827382467', name: 'lightOn', auth: '4a5d5ba88a276fc988ad123247d9aeff744626c5' }).then(
      function(data) {
      console.log('Device variable retrieved successfully:', data);
    }, function(err) {
      console.log('An error occurred while getting attrs:', err);
    });

    
  }
}

export default alt.createActions(LightActions);