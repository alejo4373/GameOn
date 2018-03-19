var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/instagran_db";
var db = pgp(connectionString);

module.exports = db;
  