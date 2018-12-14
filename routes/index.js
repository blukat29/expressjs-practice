var db = require('../db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var spendings = db.Spending.findAll();
  res.render('index', { spendings: spendings });
});

/* POST new entry */
router.post('/add', function(req, res, next) {
  try {
    db.Spending.create({
      item: req.body.item,
      amount: req.body.amount,
      unit: req.body.unit,
    });
    res.json({ error: null, result: true });
  } catch(e) {
    res.json({ error: e, result: false });
  }
});

module.exports = router;
