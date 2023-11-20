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

function isNameValid (name){
    const nameRegex = /^[A-Za-z\s]+$/u
    return nameRegex.test(name);
}

async function checkRecordExists(model, id, res) {
    const record = await model(id);
    if (record.length === 0) {
        res.status(404).json({
            error: {
                code: 404,
                message: 'Not Found',
                timestamp: Date.now()
            }
        });
        return false;
    }
    return true;
}


//USER
app.get("/users", async function (req,res) {
    const users = await userMod.getUsers()
    res.status(200).send (users)
})


app.get("/users/:id", async function (req, res) {
    const id = req.params.id;
    if (await checkRecordExists(userMod.getUser, id, res)) {
        const user = await userMod.getUser(id);
        res.status(200).send(user);
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
 
app.post("/users",async function (req,res){
    const {name, surname, email} = req.body 

    if(!name || !surname || !email){
        return res.status(400).json({ error: 'No data insert' });
    }
    if(!isNameValid(name)|| !isNameValid(surname)){
        return res.status(400).json({ error: 'Invalid Name or Surname, Only letters and spaces' });
    }
    if (!isValidEmail(email)) {
           return res.status(400).json({ error: 'Invalid email format' });
        }
    
    const  user = await userMod.createUser(name, surname, email)
    res.status(201).send(user);
})

app.put("/users", async function (req, res) {
    const { name, surname, email, id } = req.body;

    if(!name || !surname || !email || !id){
        return res.status(400).json({ error: 'No data insert' });
    }
    if(!isNameValid(name)|| !isNameValid(surname)){
        return res.status(400).json({ error: 'Invalid Name or Surname, Only letters and spaces' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
    if (await checkRecordExists(userMod.getUser, id, res)) {
        const user = await userMod.modifyUser(name, surname, email, id);
        res.status(201).send(user);
    }
});

app.delete("/users/:id", async function (req, res) {
    const id = req.params.id;
    if (await checkRecordExists(userMod.getUser, id, res)) {
        const user = await userMod.deleteUser(id);
        res.status(204).send(user);
    }
});




//PRODUCT
app.get("/products", async function (req,res) {
    const products = await productMod.getProducts()
    res.status(200).send (products)
})

app.get("/products/:id", async function (req, res) {
    const id = req.params.id;
    if (await checkRecordExists(productMod.getProduct, id, res)) {
        const product = await productMod.getProduct(id);
        res.status(200).send(product);
    }
});

app.post("/products",async function (req,res){
    const {name} = req.body
    if(!name){
        return res.status(400).json({ error: 'No data insert' });
    }
    if(!isNameValid(name)){
        return res.status(400).json({ error: 'Invalid Name, Only letters and spaces' });
    }
    const  product = await productMod.createProduct(name)
    res.status(201).send(product);
})

app.put("/products", async function (req, res) {
    const { name, id } = req.body;
    if(!name || !id){
        return res.status(400).json({ error: 'No data insert' });
    }
    if(!isNameValid(name)){
        return res.status(400).json({ error: 'Invalid Name , Only letters and spaces' });
    }
    if (await checkRecordExists(productMod.getProduct, id, res)) {
        const product = await productMod.modifyProduct(name, id);
        res.status(201).send(product);
    }
});

app.delete("/products/:id", async function (req, res) {
    const id = req.params.id;
    if (await checkRecordExists(productMod.getProduct, id, res)) {
        const product = await productMod.deleteProduct(id);
        res.status(204).send(product);
    }
});





//ORDER
app.get("/orders", async function (req,res) {
    const orders = await orderMod.getOrders()
    res.status(200).send (orders)
})

app.get("/orders/:id", async function (req, res) {
    const id = req.params.id;
    
    if (await checkRecordExists(orderMod.getOrder, id, res)) {
        const order = await orderMod.getOrder(id);
        res.status(200).send(order);
    }
});

function isValidMySQLDate(date) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }

  function isValidId(id){
    const idRegex =/^[0-9]+$/
    return idRegex.test(id);
  }

app.post("/orders",async function (req,res){
    const {date,idUser} = req.body

    if(!date || !idUser){
        return res.status(400).json({ error: 'No data insert' });
    }
    if (!isValidMySQLDate(date)) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
    const  order = await orderMod.createOrder(date,idUser)
    res.status(201).send(order);
})

app.put("/orders", async function (req, res) {
    const { date, idUser, id } = req.body;

    if(!date || !idUser || !id){
        return res.status(400).json({ error: 'No data insert' });
    }
    if (!isValidMySQLDate(date)) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
    if(!isValidId(idUser)){
        return res.status(400).json({ error: 'Invalid UserID format, numbers only' });
    }
    if (await checkRecordExists(orderMod.getOrder, id, res)) {
        const order = await orderMod.modifyOrder(date, idUser, id);
        res.status(201).send(order);
    }
});

app.delete("/orders/:id", async function (req, res) {
    const id = req.params.id;
    if (await checkRecordExists(orderMod.getOrder, id, res)) {
        const order = await orderMod.deleteOrder(id);
        res.status(204).send(order);
    }
});



//OHP
app.get("/ohp", async function (req,res) {
    const ohps = await ohpMod.getOHPs()
    res.status(200).send (ohps)
})

app.get("/ohp/:id", async function (req, res) {
    const id = req.params.id;
    if (await checkRecordExists(ohpMod.getOHP, id, res)) {
        const ohp = await ohpMod.getOHP(id);
        res.status(200).send(ohp);
    }
});

app.post("/ohp",async function (req,res){
    const {idOrder,idProduct} = req.body
    
    if(!idOrder || !idProduct){
        return res.status(400).json({ error: 'No data insert' });
    }
    if(!isValidId(idOrder)||!isValidId(idProduct)){
        return res.status(400).json({ error: 'Invalid UserID format, numbers only' });
    }
    const  ohp = await ohpMod.createOHP(idOrder,idProduct)
    res.status(201).send(ohp);
})

app.put("/ohp", async function (req, res) {
    const { idOrder, idProduct, id } = req.body;
    if(!idOrder || !idProduct || !id){
        return res.status(400).json({ error: 'No data insert' });
    }
    if(!isValidId(idOrder)||!isValidId(idProduct)){
        return res.status(400).json({ error: 'Invalid UserID format, numbers only' });
    }
    if (await checkRecordExists(ohpMod.getOHP, id, res)) {
        const ohp = await ohpMod.modifyOHP(idOrder, idProduct, id);
        res.status(201).send(ohp);
    }
});

app.delete("/ohp/:id", async function (req, res) {
    const id = req.params.id;
    if (await checkRecordExists(ohpMod.getOHP, id, res)) {
        const ohp = await ohpMod.deleteOHP(id);
        res.status(204).send(ohp);
    }
});


//ORDER AND PRODUCT SORT BY DATE
app.get("/date-sort/:date", async function(req,res){
    const date = req.params.date
    if (!isValidMySQLDate(date)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }
    const sort = await querys.getQueryDate(date)
    if (sort.length==0){
        res.status(404).json({
            error: {
                code: 404,
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
                code: 404,
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
    const date = req.query.date;
    const product= req.query.product;
    if(!date || !product){
        return res.status(400).json({ error: 'No data insert' });
    }
    if (!isValidMySQLDate(date)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    const sort = await querys.getQueryBoth(product,date)
    if (sort.length==0){
        res.status(404).json({
            error: {
                code: 404,
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