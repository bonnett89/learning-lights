var brain = require('brain');

var net = new brain.NeuralNetwork();

function predict(data, network) {
  var currentNet = net.fromJSON(network);
  return currentNet.run(data);
}

module.exports = {
  predict: predict
};
