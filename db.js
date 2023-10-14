// Connect ke database
const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "movies",
	password: "29122001",
	port: 5432,
});

module.exports = pool;