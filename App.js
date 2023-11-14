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
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
})

app.get('/',function(req,res){
    res.send('this is the homepage');
});




//USER
app.get("/users", async function (req,res) {
    const users = await userMod.getUsers()
    res.status(200).send (users)
})


app.get("/users/:id", async function (req,res){
    const id = req.params.id
    const user = await userMod.getUser(id)
      if (user.length==0){
        res.status(404).json({
            error: {
                code: 500,
                message: 'Internal Server Error',
                timestamp: Date.now()
            }
        })
      }
      else{
        res.status(200).send(user)
      };
});

app.post("/users",async function (req,res){
    const {name, surname, email} = req.body
    const  user = await userMod.createUser(name, surname, email)
    res.status(201).send(user);
})

app.put("/users-update", async function(req,res){
    const {name,surname,email,id} = req.body
    const user = await userMod.modifyUser(name,surname,email,id)
    res.status(201).send(user)
})

app.delete("/users-delete/:id", async function(req,res){
    const id = req.params.id
    const user = await userMod.deleteUser(id)
    res.status(204).send(user)
})





//PRODUCT
app.get("/products", async function (req,res) {
    const products = await productMod.getProducts()
    res.status(200).send (products)
})

app.get("/products/:id", async function (req,res){
    const id = req.params.id
    const product = await productMod.getProduct(id)
    
    if (product.length==0){
        res.status(404).json({
            error: {
                code: 500,
                message: 'Internal Server Error',
                timestamp: Date.now()
            }
        })
      }
      else{
        res.status(200).send (product)
      };
    
})

app.post("/products",async function (req,res){
    const {name} = req.body
    const  product = await productMod.createProduct(name)
    res.status(201).send(product);
})

app.put("/products-update", async function(req,res){
    const {name,id} = req.body
    const product = await productMod.modifyProduct(name,id)
    res.status(201).send(product)
})

app.delete("/products-delete/:id", async function(req,res){
    const id = req.params.id
    const product = await productMod.deleteProduct(id)
    res.status(204).send(product)
})





//ORDER
app.get("/orders", async function (req,res) {
    const orders = await orderMod.getOrders()
    res.status(200).send (orders)
})

app.get("/orders/:id", async function (req,res){
    const id = req.params.id
    const order = await orderMod.getOrder(id)
    if (order.length==0){
        res.status(404).json({
            error: {
                code: 500,
                message: 'Internal Server Error',
                timestamp: Date.now()
            }
        })
      }
      else{
        res.status(200).send(order)
      };
})

app.post("/orders",async function (req,res){
    const {date,idUser} = req.body
    const  order = await orderMod.createOrder(date,idUser)
    res.status(201).send(order);
})

app.put("/orders-update", async function(req,res){
    const {date,idUser,id} = req.body
    const order = await orderMod.modifyOrder(date,idUser,id)
    res.status(201).send(order)
})

app.delete("/orders-+-delete/:id", async function(req,res){
    const id = req.params.id
    const order = await orderMod.deleteOrder(id)
    res.status(204).send(order)
})



//OHP
app.get("/ohp", async function (req,res) {
    const ohps = await ohpMod.getOHPs()
    res.status(200).send (ohps)
})

app.get("/ohp/:id", async function (req,res){
    const id = req.params.id
    const ohp = await ohpMod.getOHP(id)
    if (ohp.length==0){
        res.status(404).json({
            error: {
                code: 500,
                message: 'Internal Server Error',
                timestamp: Date.now()
            }
        })
      }
      else{
        res.status(200).send(ohp)
      };
    
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
    res.status(204).send(ohp)
})



//ORDER AND PRODUCT SORT BY DATE
app.get("/date-sort/:date", async function(req,res){
    const date = req.params.date
    const sort = await querys.getQueryDate(date)
    if (sort.length==0){
        res.status(404).json({
            error: {
                code: 500,
                message: 'Internal Server Error',
                timestamp: Date.now()
            }
        })
      }
      else{
        res.status(200).send(sort)
      };
   
})


//ORDER AND PRODUCT SORT BY PRODUCT NAME
app.get("/product-sort/:product", async function(req,res){
    const product = req.params.product
    const sort = await querys.getQueryProduct(product)
    if (sort.length==0){
        res.status(404).json({
            error: {
                code: 500,
                message: 'Internal Server Error',
                timestamp: Date.now()
            }
        })
      }
      else{
        res.status(200).send(sort)
      };
})


//ORDER AND PRODUCT SORT BY PRODUCT NAME and DATE
app.get("/product-date", async function(req,res){
    //const {product,date} = req.body//
    const date = req.query.date;
    const product= req.query.product;
    const sort = await querys.getQueryBoth(product,date)
    if (sort.length==0){
        res.status(404).json({
            error: {
                code: 500,
                message: 'Internal Server Error',
                timestamp: Date.now()
            }
        })
      }
      else{
        res.status(200).send(sort)
      };
})



app.listen(3000)