const express = require('express');
const router = express.Router();
const experiment = require('../lib-tensorflow/basic-example');

/* GET home page. */
router.get('/basic-example', function(req, res, next) {
  res.render('training', { title: 'Basic Example in Node.js' });
  //process.nextTick(experiment.start);
  setTimeout(experiment.start, 1000); // Give a little grace to let the client initialize
});

module.exports = router;
