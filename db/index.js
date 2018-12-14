var SQLite = require('better-sqlite3');

var conn = new SQLite('money.db');

function importModel(path) {
  var clazz = require(path);
  var model = new clazz({ conn: conn });
  model.sync();
  return model;
}

var db = {};
db['Spending'] = importModel('./spending');

module.exports = db;
