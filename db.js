const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: "admin",
	host: "db.cqatkeqpwupisfdzxjgq.supabase.co",
	port: "5432",
	database: "postgres"
})

module.exports = pool;