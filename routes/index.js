var db = require('../db');
var express = require('express');
var router = express.Router();

function getCurrencyRate(unit) {
  var rates = {
    'KRW': 1,
    'USD': 1000,
    'JPY': 100,
  };
  return rates[unit];
}

function totalAmount(spendings) {
  var total = 0;
  for (var i=0; i<spendings.length; i++) {
    total += parseFloat(spendings[i].amount)
      * getCurrencyRate(spendings[i].unit);
  }
  return total;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var spendings = db.Spending.findAll();
  var total = totalAmount(spendings);
  res.render('index', { spendings: spendings, total: total });
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
