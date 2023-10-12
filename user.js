var connection = require('./mysql')
var mysql = require('mysql');


let MyUser = connection.then(

    function(result, rej){
    var user = {
        id : result.idUser,
        name : result.nameUser,
        surname : result.surnameUser,
        email : result.emailUser,
    }
    if(user != null && user != ''){
        result(user);
    }
    else{
        rej(console.error('Something whent wrong'));
    }
    

}).then(
   function(value) {module.exports = value},
   function(error) {console.log(error)}
);