var express = require('express');
var user = require('./user');
var mysql = require('mysql');

var app = express();

app.get('/',function(req,res){
    res.send('this is the homepage');
});

app.get('/user',function(req,res){
    res.send(result.name);
});

app.listen(3000)
