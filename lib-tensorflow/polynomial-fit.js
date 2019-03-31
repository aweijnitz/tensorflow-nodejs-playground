/**
 * Approximate a polynomial function.
 * This is basically an adaptation of the Coding Train video on the topic
 * https://www.youtube.com/watch?v=tIXDik5SGsI&index=7&list=PLRqwX-V7Uu6YIeVA3dNxbR9PYj4wV31oQ&t=0s
 *
 * Load the Tensorflow package:
 *
 * Use '@tensorflow/tfjs-node-gpu' to run with GPU.
 * Use '@tensorflow/tfjs' to run without the C++ binding.
 * Use '@tensorflow/tfjs-node' to run
 */
const tf = require('@tensorflow/tfjs-node');
const server = require('../lib-server/socketServer');
let commandLineMode = false;

if (require.main === module)
  commandLineMode = true;

const logData = data => {
  if (commandLineMode)
    console.log(data);
  else
    server.broadCastData({loss: data});
};

const logMsg = msg => {
  if (commandLineMode)
    console.log(msg);
  else
    server.broadCastMsg({msg: msg});
};


// The function we want to train the network to approximate. A polynomial function of degree 3
//
const polynomial = x => 9 * Math.pow(x, 3) + 8 * Math.pow(x, 2) + 7 * x + 6;
const functionToApproximate = polynomial; // convenience to make it easy to switch functions without search and replace


// Create training data in interval [-1,1]
const nrDataPoints = 50;
const Xset = Array(nrDataPoints); // In the generalized case, these are the input of the data
const Yset = Array(nrDataPoints); // In the generalized case, these are the 'labels' of the data
let x = -1;
for (let i = 0; i < nrDataPoints; i++) {
  Xset[i] = x;
  Yset[i] = functionToApproximate(x);
  x += 2 / nrDataPoints;
}
const xTensor = tf.tensor1d(Xset, 'float32');
const yTensor = tf.tensor1d(Yset, 'float32');


// Define the parameters we want to find, starting with some initial random guess value.
// In this case, we want to find k and m from above.
//
// tf.variable tells Tensorflow that this scalar can be changed when running the optimizer to minimize the loss
// In short, we are telling Tensorflow, that these are the variables to be tuned during training.
const a = tf.variable(tf.scalar(-10 + 10 * Math.random(), 'float32'));
const b = tf.variable(tf.scalar(-10 + 10 * Math.random(), 'float32'));
const c = tf.variable(tf.scalar(-10 + 10 * Math.random(), 'float32'));
const d = tf.variable(tf.scalar(-10 + 10 * Math.random(), 'float32'));


// Define the prediction function.
// This is needed since we are explicitly defining the model here and not using a neural network.
const predict = (inputTensor) => {
  return inputTensor.pow(3).mul(a).add(inputTensor.pow(2).mul(b)).add(inputTensor.mul(c)).add(d); // Calculate output, given input and the current estimated parameters
};


// Define the optimizer
const learningRate = 0.15;
const optimizer = tf.train.sgd(learningRate); // SDG = Stochastic Gradient Descent

// Define the loss function (Square Mean Error)
// Label in this case is the y = k*x + m from the training data ('Yset' below)
const loss = (pred, label) => pred.sub(label).square().mean();

const startTraining = () => {
  
  const epochs = 10000;
  const threshold = 0.000001;
  for (let i = 0; i < epochs; i++) {
    optimizer.minimize(() => loss(predict(xTensor), yTensor));
    
    if (i % 100 === 0)
      logData(loss(predict(xTensor), yTensor).dataSync());
    if (loss(predict(xTensor), yTensor).dataSync() <= threshold) {
      logMsg('Training completed at epoc: ' + i);
      break;
    }
  }
};


if (commandLineMode) {
  
  logMsg('Allocated Tensors: ' + tf.memory().numTensors);
  logMsg('BEFORE a ' + a.dataSync());
  logMsg('BEFORE b ' + b.dataSync());
  logMsg('BEFORE c ' + c.dataSync());
  logMsg('BEFORE d ' + d.dataSync());

  tf.tidy(startTraining);
  logMsg('TRAINING COMPLETE ------- ');
  logMsg('AFTER a ' + a.dataSync());
  logMsg('AFTER b ' + b.dataSync());
  logMsg('AFTER a ' + c.dataSync());
  logMsg('AFTER b ' + d.dataSync());
  
  tf.tidy(() => {
    const input = 1.0;
    logMsg('- Actual f(input) = ' + functionToApproximate(input));
    logMsg('- Predicted f(input) = ' + predict(tf.tensor1d([input], 'float32')).dataSync());
  });
  
  tf.disposeVariables();
  tf.dispose(xTensor);
  tf.dispose(yTensor);
  logMsg('Leaking allocated Tensors: ' + tf.memory().numTensors);
  
}
else
  exports.start = startTraining;