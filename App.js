var express = require('express');
var userMod = require('./modules/user');
var productMod = require('./modules/prdouct');
var orderMod = require('./modules/order')

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


app.get("/user/:id", async function (req,res){
    const id = req.params.id
    const user = await userMod.getUser(id)
      
    res.send(user);
});

app.post("/user",async function (req,res){
    const {name, surname, email} = req.body
    const  user = await userMod.createUser(name, surname, email)
    res.status(201).send(user);
})

app.put("/user-update", async function(req,res){
    const {name,surname,email,id} = req.body
    const user = await userMod.modifyUser(name,surname,email,id)
    res.status(201).send(user)
})

app.delete("/user-delete/:id", async function(req,res){
    const id = req.params.id
    const user = await userMod.deleteUser(id)
    res.status(201).send(user)
})





//PRODUCT
app.get("/product", async function (req,res) {
    const products = await productMod.getProducts()
    res.send (products)
})

app.get("/product/:id", async function (req,res){
    const id = req.params.id
    const product = await productMod.getProduct(id)
    res.send(product);
})

app.post("/product",async function (req,res){
    const {name} = req.body
    const  product = await productMod.createProduct(name)
    res.status(201).send(product);
})

app.put("/product-update", async function(req,res){
    const {name,id} = req.body
    const product = await productMod.modifyProduct(name,id)
    res.status(201).send(product)
})

app.delete("/product-delete/:id", async function(req,res){
    const id = req.params.id
    const product = await productMod.deleteProduct(id)
    res.status(201).send(product)
})





//ORDER
app.get("/order", async function (req,res) {
    const orders = await orderMod.getOrders()
    res.send (orders)
})

app.get("/order/:id", async function (req,res){
    const id = req.params.id
    const order = await orderMod.getOrder(id)
    res.send(order);
})

app.post("/order",async function (req,res){
    const {date,idUser} = req.body
    const  order = await orderMod.createOrder(date,idUser)
    res.status(201).send(order);
})

app.put("/order-update", async function(req,res){
    const {date,idUser,id} = req.body
    const order = await orderMod.modifyOrder(date,idUser,id)
    res.status(201).send(order)
})

app.delete("/product-delete/:id", async function(req,res){
    const id = req.params.id
    const product = await productMod.deleteProduct(id)
    res.status(201).send(product)
})



app.listen(3000)