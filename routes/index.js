var express = require('express');
var router = express.Router();
var apples = [ 'grannies', 'green']
var oranges = [ 'sunkist', 'I like this' ]
var pears = ['pear1', 'pear2']
var bananas = ['big banana','small banana']
var cheeses = [ 'danish blue', 'sterling blue']

/* GET apples */
router.get('/apples', function(req, res, next) {
  res.status(200).json(apples);
});

/* GET oranges */
router.get('/oranges', function(req, res, next) {
  res.status(200).json(oranges);
});


/* GET pears */
router.get('/pears', function(req, res, next) {
  res.status(200).json(pears);
});


/* GET bananas */
router.get('/bananas', function(req, res, next) {
  res.status(200).json(bananas);
});

/* GET cheese */
router.get('/cheeses', function(req, res, next) {
  res.status(200).json(cheeses);
});

module.exports = router;
