var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/gameon_db";
var db = pgp(connectionString);

module.exports = db;
  