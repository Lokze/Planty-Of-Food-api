require('dotenv').config();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST ,
  user     : process.env.MYSQL_USER ,
  password : process.env.MYSQL_PASS ,
  database : process.env.MYSQL_DB,
});
 
module.exports =connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  var con= connection.query("SELECT * FROM user", function(err,result,fields){
    if (err) throw err;
    console.log(result);
    return result;
  })
  return con;
});

