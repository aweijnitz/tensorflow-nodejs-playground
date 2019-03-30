// Load the package:
// Use '@tensorflow/tfjs-node-gpu' to run with GPU.
// Use '@tensorflow/tfjs' to run without the C++ binding.
// Use '@tensorflow/tfjs-node' to run the C++ binding.
const tf = require('@tensorflow/tfjs-node');
const server = require('../lib-server/socketServer');
let commandLineMode = false;

if (require.main === module)
  commandLineMode = true;

const logData = (data) => {
  if (commandLineMode)
    console.log(data);
  else
    server.broadCastData(data);
};

const logMsg = (msg) => {
  if (commandLineMode)
    console.log(msg);
  else
    server.broadCastMsg(msg);
};

const startTraining = () => {
  // Train a simple model:
  const model = tf.sequential();
  model.add(tf.layers.dense({units: 100, activation: 'relu', inputShape: [10]}));
  model.add(tf.layers.dense({units: 1, activation: 'linear'}));
  model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
  
  const xs = tf.randomNormal([100, 10]);
  const ys = tf.randomNormal([100, 1]);
  
  const epochs = 500;
  model.fit(xs, ys, {
    epochs: epochs,
    verbose: 0,
    callbacks: {
      onEpochEnd: (epoch, log) => {
        if (epoch % 10 === 0)
          logData(`Epoch ${epoch}/${epochs}: loss = ${log.loss}`);
      },
      onTrainBegin: () => {
        logMsg({msg: 'Training started '});
      },
      onTrainEnd: () => {
        logMsg({msg: 'Training completed'});
      }
    }
  });
};

if (commandLineMode)
  startTraining();
else
  exports.start = startTraining;