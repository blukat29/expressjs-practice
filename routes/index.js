var db = require('../db');
var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

var rates = {
  'KRW': 1,
  'USD': 0.0001,
  'JPY': 0.1,
};
var lastUpdate = null;

function queryCurrencyRate() {
  // Cache result for one hour.
  if (lastUpdate && (Date.now() - lastUpdate < 60*60*1000)) {
    console.log('Using cache..');
    return Promise.resolve();
  } else {
    console.log('Querying..');
    return fetch('https://api.exchangeratesapi.io/latest?base=KRW')
      .then(res => res.json())
      .then(res => {
        rates = res.rates;
        lastUpdate = Date.now();
      });
  }
}

function totalAmount(spendings) {
  var total = 0;
  for (var i=0; i<spendings.length; i++) {
    total += parseFloat(spendings[i].amount) / rates[spendings[i].unit];
  }
  return total;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var spendings = db.Spending.findAll();
  queryCurrencyRate().then(() => {
    var total = totalAmount(spendings);
    res.render('index', { spendings: spendings, total: total });
  });
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
