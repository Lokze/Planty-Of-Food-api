var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST ,
  user     : process.env.MYSQL_USER ,
  password : process.env.MYSQL_PASS ,
  database : process.env.MYSQL_DB,
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});