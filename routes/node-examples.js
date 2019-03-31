const express = require('express');
const router = express.Router();
const basicExample = require('../lib-tensorflow/basic-example');
const lineFit = require('../lib-tensorflow/line-fit');
const polyFit = require('../lib-tensorflow/polynomial-fit');

router.get('/basic-example', function(req, res, next) {
  res.render('training', { title: 'Basic Example in Node.js' });
  //process.nextTick(experiment.start);
  setTimeout(basicExample.start, 1000); // Give a little grace to let the client initialize
});

router.get('/line-fit', function(req, res, next) {
  res.render('training', { title: 'Simple Line Fitting' });
  //process.nextTick(experiment.start);
  setTimeout(lineFit.start, 1000); // Give a little grace to let the client initialize
});

router.get('/polynomial-fit', function(req, res, next) {
  res.render('training', { title: 'Polynomial Fitting of Cubic Function' });
  //process.nextTick(experiment.start);
  setTimeout(polyFit.start, 1000); // Give a little grace to let the client initialize
});

module.exports = router;
