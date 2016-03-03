//var synaptic = require('synaptic');
var brain = require('brain');

//var Network = synaptic.Network;
var net = new brain.NeuralNetwork();


var jsonNetwork = {"layers":[{"light":{},"day":{},"time":{}},{"0":{"bias":1.3991721983053655,"weights":{"light":-22.64625029350706,"day":-1.4184272246532996,"time":0.10938065763742706}},"1":{"bias":-0.7275488513782409,"weights":{"light":14.961713168112961,"day":0.613920955331628,"time":-0.2775984400932922}},"2":{"bias":0.4616215161144151,"weights":{"light":-9.82700367986166,"day":-0.8082669950049145,"time":-0.018802707981840607}}},{"off":{"bias":4.007384649458023,"weights":{"0":-15.145635930732242,"1":11.645801824446817,"2":-5.951115129481313}},"on":{"bias":-4.090215569703473,"weights":{"0":15.158925918006734,"1":-11.571327427912308,"2":6.033805145124605}}}],"outputLookup":true,"inputLookup":true}


function network()
{
    //return Network.fromJSON(jsonNetwork);
    return net.fromJSON(jsonNetwork);
}

function predict(data) {
  //var network = Network.fromJSON(jsonNetwork);
  //return network.activate(data)
  var network = net.fromJSON(jsonNetwork);
  return network.run(data);
}

module.exports = {
  network: network,
  predict: predict
};

/*

  var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': my_url,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
  })(); 
  */