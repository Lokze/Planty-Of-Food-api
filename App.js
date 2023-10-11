var express = require('express');

var app = express();

app.get('/',function(req,res){
    res.send('this is the homepage');
});

app.get('/user',function(req,res){
    res.send('this is the user page');
});

app.listen(3000)
