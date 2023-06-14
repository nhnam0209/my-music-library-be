const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "db" || "host.docker.internal" || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin123",
  database: process.env.DB_NAME || "music_library",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("The database connection has been failed");
  } else {
    console.log("MySQL Database connected. Enjoy!!");
  }
});

module.exports = pool;
