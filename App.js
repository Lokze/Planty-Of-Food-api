var express = require('express');
var getUsers = require('./user');

var app = express();

app.get('/',function(req,res){
    res.send('this is the homepage');
});

app.get('/user',function(req,res){
    getUsers(function(err, user){
        if(err) {
            res.status(500).json({error:'Error fetching users'})
        }else{
            res.json(user[0]);
        }
    })
});

app.listen(3000)