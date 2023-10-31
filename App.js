var express = require('express');
var userMod = require('./modules/user');
var productMod = require('./modules/prdouct');
var orderMod = require('./modules/order');
var ohpMod = require('./modules/order_has_product');
var querys = require('./modules/querys');

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

app.delete("/order-delete/:id", async function(req,res){
    const id = req.params.id
    const order = await orderMod.deleteOrder(id)
    res.status(201).send(order)
})



//OHP
app.get("/ohp", async function (req,res) {
    const ohps = await ohpMod.getOHPs()
    res.send (ohps)
})

app.get("/ohp/:id", async function (req,res){
    const id = req.params.id
    const ohp = await ohpMod.getOHP(id)
    res.send(ohp);
})

app.post("/ohp",async function (req,res){
    const {idOrder,idProduct} = req.body
    const  ohp = await ohpMod.createOHP(idOrder,idProduct)
    res.status(201).send(ohp);
})

app.put("/ohp-update", async function(req,res){
    const {idOrder,idProduct,id} = req.body
    const ohp = await ohpMod.modifyOHP(idOrder,idProduct,id)
    res.status(201).send(ohp)
})

app.delete("/ohp-delete/:id", async function(req,res){
    const id = req.params.id
    const ohp = await ohpMod.deleteOHP(id)
    res.status(201).send(ohp)
})



//ORDER AND PRODUCT SORT BY DATE
app.get("/date-sort/:date", async function(req,res){
    const date = req.params.date
    const sort = await querys.getQueryDate(date)
    res.send(sort)
})


//ORDER AND PRODUCT SORT BY PRODUCT NAME
app.get("/product-sort/:product", async function(req,res){
    const product = req.params.product
    const sort = await querys.getQueryProduct(product)
    res.send(sort)
})


//ORDER AND PRODUCT SORT BY PRODUCT NAME and DATE
app.get("/product-date", async function(req,res){
    const {product,date} = req.body
    const sort = await querys.getQueryBoth(product,date)
    res.send(sort)
})



app.listen(3000)