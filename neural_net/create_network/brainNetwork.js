var brain = require('brain');

var mongoose = require('mongoose');
var Light = require('../models/light');
var jsonfile = require('jsonfile');

var file = './data/brain_network.json'

var net = new brain.NeuralNetwork();

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
  var value = parseInt(lightValue) / 1000;
  //console.log('Value: ' + value);
  var d = new Date(data['date']);
  //console.log('Date: ' + d)
  var dayOfWeek = d.getDay() / 10;
  //console.log('Day: ' + dayOfWeek);
  var timeSince1970 = d.getTime() / 10000000000000;
  //console.log('timeSince1970 ms: ' + timeSince1970);
  if (value < 0.03) {
    outputValue = { on: 1 };
  } else {
    outputValue = { off: 1};
  }
  var input = { light: value, day: dayOfWeek, time: timeSince1970 };
  //var output = [outputValue];
  //console.log(input);
  trainingInputObject = {
    input: input,
    output: outputValue
  }
  console.log(trainingInputObject);
  newTrainingSet.push(trainingInputObject);
}

var trainNetwork = function(data) {
  console.log('training...')
  net.train(data, {
    errorThresh: 0.005,  // error threshold to reach
    iterations: 20000,   // maximum training iterations
    log: true,           // console.log() progress periodically
    logPeriod: 10,       // number of iterations between logging
    learningRate: 0.1    // learning rate
  })
}

var predictTest = function() {
  console.log('predicting...')
  var output = net.run({ light: 0.02, day: 0.4, time: 0.1456332434279 });
  console.log(output);
}


var exportNetwork = function() {
  var exported = net.toJSON();
  console.log(exported);
  jsonfile.writeFile(file, exported, function (err) {
    console.error(err);
  });
}


