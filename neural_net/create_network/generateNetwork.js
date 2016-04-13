var brain = require('brain');

var mongoose = require('mongoose');
var Light = require('../../models/light');
var jsonfile = require('jsonfile');
var config = require('../../config');

var file = '../data/brain_network.json';

var net = new brain.NeuralNetwork();

mongoose.connect(config.database);

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
  .exec(function(err, data) {
    if (err) return console.error(err);

    for (var i = 0; i < data.length; i++) {
      generateTrainingInput(data[i]);
    }
    var trainingSet = newTrainingSet;
    trainNetwork(trainingSet);
    predictTest();
    exportNetwork();
    mongoose.connection.close();
  });

var generateTrainingInput = function(data) {

  var outputValue;

  //GET LIGHT LEVEL
  var lightValue =  data['lightLevel'];
  var value = parseInt(lightValue) / 10000;
 
  //GET DATE DATA
  var d = new Date(data['date']);

  var dayOfWeek = d.getDay() / 10;

  //GET TIME OF DAY
  var hour = addZero(d.getHours()).toString();
  var minutes = addZero(d.getMinutes()).toString();
  var seconds = addZero(d.getSeconds()).toString();

  var timeCombined = '0.'+ hour + minutes + seconds;

  var time = parseFloat(timeCombined);

  //GET OUTPUT
  if (data['lightState'] == 1) {
    outputValue = { on: 1 };
  } else {
    outputValue = { off: 1};
  }

  //INPUT OBJECT
  var input = { light: value, day: dayOfWeek, time: time };
  
  //TRAINING OBJECT
  trainingInputObject = {
    input: input,
    output: outputValue
  }
  //console.log(trainingInputObject);

  //add to training set
  newTrainingSet.push(trainingInputObject);
}

function addZero(i) {
  if(i < 10) {
    i = '0' + i;
  }
  return i;
}

var trainNetwork = function(data) {
  console.log('training...')
  net.train(data, {
    errorThresh: 0.0002,  // error threshold to reach
    iterations: 100000,   // maximum training iterations
    log: true,           // console.log() progress periodically
    logPeriod: 10,       // number of iterations between logging
    learningRate: 0.1    // learning rate
  })
}

var predictTest = function() {
  console.log('predicting...')
  var output = net.run({ light: 0.02, day: 0.2, time: 0.175912 });
  console.log(output);
}


var exportNetwork = function() {
  var exported = net.toJSON();
  console.log(exported);
  jsonfile.writeFile(file, exported, function (err) {
    console.error(err);
  });
}


