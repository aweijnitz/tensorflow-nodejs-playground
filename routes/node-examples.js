var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/basic-example', function(req, res, next) {
  res.render('training', { title: 'Basic Example in Node.js' });
});

module.exports = router;
