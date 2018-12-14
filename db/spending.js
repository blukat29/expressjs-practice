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
}

module.exports = Spending;
