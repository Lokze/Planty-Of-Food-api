var connection = require('./mysql')

//SELECT REQUEST
function getUsers(callback){

    connection.query('SELECT * FROM  user',  function(err,user){
        if (err){
            console.error('Error executing MySQL query: ' + err)
            callback(err,null);
        } else {
            if (!user || user.length === 0) {
                console.log('No results found.');
                callback(null,[]);
              }else {
                callback(null,user)
              }
        }
        connection.end();
    });
}

module.exports = getUsers;
 


