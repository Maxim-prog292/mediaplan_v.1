const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "10.90.20.79",
    user: "root",
    password: "SdfSelf69",
    database: "myfirstdb",
    // debug: true,
    trace: true,
    port: 3306
  });

//   host: "mcmaganw.beget.tech",
//   user: "mcmaganw_mdata",
//   password: "64jdC%mX",
//   database: "mcmaganw_mdata",
  
  pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results[0].solution);
  });
module.exports = pool