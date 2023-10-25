var connection = require('./mysql')

//SELECT * PRODUCT REQUEST
async function getProducts() {
    const [rows] = await connection.query("SELECT * FROM product")
    return rows
}

//SELECT SPECIFIC ORDER REQUEST
async function getProduct(id){
    const [rows] = await connection.query(`
         SELECT *
         FROM  product
         WHERE idProduct= ?
         `,[id])
         return rows
}

//INSERT REQUST
async function createProduct(name){
    const [result] = await connection.query(`
    INSERT INTO product (productName)
    VALUES (?)
    `, [name])
    const id = result.insertId
    return getProduct(id);
}

//MODIFY REQUEST
async function modifyProduct(name,id){
    await connection.query(`
    UPDATE product
    SET productName=?
    WHERE idProduct=?
    `,[name,id])
    return getProduct(id);
}

//DELETE REQUEST
async function deleteProduct(id){
    await connection.query(`
    DELETE FROM product
    WHERE idProduct=?
    `,[id])

    const result = await getProduct(id)
    
    if(result.length==0){
    return console.log('The product by the id: '+ id+ ' has been succssefully removed')
    }
    else{
        return console.log('Something went wrong in the deletion of the product by the id :'+ id)
    }
    
}


module.exports={
    getProducts : getProducts,
    getProduct : getProduct,
    createProduct : createProduct,
    modifyProduct : modifyProduct,
    deleteProduct : deleteProduct,
}