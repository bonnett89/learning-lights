var synaptic = require('synaptic');
var mongoose = require('mongoose');
var Light = require('../models/light');

var Architect = synaptic.Architect,
    Trainer = synaptic.Trainer,
    Network = synaptic.Network,
    Layer = synaptic.Layer;

//var network = new Architect.Perceptron(3,5,1);
//var trainer = new Trainer(network);

var finishedNetwork;

function Perceptron(input, hidden, output)
{
    // create the layers
    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers
    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var network= new Perceptron(3,4,1);
var trainer = new Trainer(network);

mongoose.connect('mongodb://localhost:27017/test');

mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');

});

var mongoData = {};

mongoose.connection.once('open', function() {
  console.info('We are connected');
})


var newTrainingSet = [];
var trainingInputObject = {
  input: [],
  output: []
};

var trainingSet = [];
/*
Light.find(function(err, data){
    if (err) return console.error(err);
    //console.log(">>>>" + data);
    //mongoData = data;
    //console.log(mongoData);
    for (var i = 0; i < data.length; i++) {
      generateTrainingInput(data[i]);
    }
    
    mongoose.connection.close();
});
*/

Light
  .find()
  .limit(500)
  .exec(function(err, data) {
    if (err) return console.error(err);
    //console.log(">>>>" + data);
    //mongoData = data;
    //console.log(mongoData);
    for (var i = 0; i < data.length; i++) {
      generateTrainingInput(data[i]);
    }
    //console.log(newTrainingSet);
    var trainingSet = newTrainingSet;
    trainNetwork(trainingSet);
    predictTest();
    exportNetwork();
    mongoose.connection.close();
  });

var generateTrainingInput = function(data) {

  var outputValue;

  var lightValue =  data['value'];
  var value = parseInt(lightValue);
  //console.log('Value: ' + a);
  var d = new Date(data['date']);
  //console.log('Date: ' + d)
  var dayOfWeek = d.getDay();
  //console.log('Day: ' + n);
  var timeSince1970 = d.getTime();
  //console.log('timeSince1970 ms: ' + m);
  if (value < 30) {
    outputValue = 1;
  } else {
    outputValue = 0;
  }
  var input = [value, dayOfWeek, timeSince1970];
  var output = [outputValue];
  //console.log(input);
  trainingInputObject = {
    input: input,
    output: output
  }
  //console.log(trainingInputObject);
  newTrainingSet.push(trainingInputObject);
}

var trainNetwork = function(data) {
  console.log('training...')
  trainer.train(data,{
    rate: .3,
    iterations: 100000,
    error: .005,
    shuffle: false,
    log: 1000,
    cost: Trainer.cost.MSE
  });
}

var predictTest = function() {
  console.log('predicting...')
  var now = new Date(Date.now).getTime();
  console.log(network.activate([400,3,1456332190907]));
}

var exportNetwork = function() {
  var exported = network.toJSON();
  console.log(exported);
  finishedNetwork = exported;
}


