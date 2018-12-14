class Spending {
  constructor(args) {
    this.conn = args.conn;
  }
  sync() {
    var query =
      'CREATE TABLE IF NOT EXISTS spendings (' +
      '  id INTEGER PRIMARY KEY AUTOINCREMENT,' +
      '  item TEXT NOT NULL,' +
      '  amount TEXT NOT NULL,' +
      '  unit TEXT NOT NULL );';
    this.conn.prepare(query).run();
  }
  findAll() {
    var query = 'SELECT id, item, amount, unit FROM spendings';
    return this.conn.prepare(query).all();
  }
  create(values) {
    if (!values.item || !values.amount || !values.unit) {
      throw "Invalid arguments";
    }
    if (!values.item.length) {
      throw "Item is empty";
    }
    if (!values.amount.match(/^\d+(\.\d+)?$/)) {
      throw "Amount is not a number";
    }
    if (values.unit.length != 3) {
      throw "Unit is not a currency ticker";
    }
    var query =
      'INSERT INTO spendings (item, amount, unit)' +
      ' VALUES ($item, $amount, $unit);';
    this.conn.prepare(query).run(values);
  }
}

module.exports = Spending;
