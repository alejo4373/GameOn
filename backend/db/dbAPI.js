var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/instagran_db";
var db = pgp(connectionString);

const registerUser = () => {
db.none('SELECT * FROM users')
}