var db = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var spendings = db.Spending.findAll();
  res.render('index', { spendings: spendings });
});

module.exports = router;
