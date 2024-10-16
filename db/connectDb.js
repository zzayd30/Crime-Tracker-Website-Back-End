const sql = require("mssql");

const connectDb = () => {
  var sql = require("mssql");
  // config for your database
  var config = {
    user: "", //Add User Name
    password: "", // User Password
    server: "", // Server Name
    database: "", // Database Name
    synchronize: true,
    trustServerCertificate: true,
  };
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query("SELECT * FROM TEST", function (err, result) {
      if (err) console.log(err);
      // send records as a response
      console.log(result.recordset[0]);
    });
  });
};

module.exports = connectDb;
