var express = require('express');
var userMod = require('./user');

var app = express();

app.use(express.json())

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Somethin broke!')
})

app.get('/',function(req,res){
    res.send('this is the homepage');
});

//USER
app.get("/user", async function (req,res) {
    const users = await userMod.getUsers()
    res.send (users)
})


app.get('/user/:id', async function (req,res){
    const id = req.params.id
    const user = await userMod.getUser(id)
      
    res.send(user);
});

app.post("/user",async function (req,res){
    const {name, surname, email} = req.body
    const  user = await userMod.createUser(name, surname, email)
    res.status(201).send(user);
})

app.listen(3000)