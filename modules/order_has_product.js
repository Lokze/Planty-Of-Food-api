var connection = require('./mysql')


//SELECT * ORDER_HAS_PRODUCT (OHP) REQUEST
 async function getOHPs() {
    const [rows] = await connection.query("SELECT * FROM order_has_product")
    return rows
}



//SELECT SPECIFIC OHP REQUEST
async function getOHP(id){
    const [rows] = await connection.query(`
         SELECT *
         FROM  order_has_product
         WHERE idOhp= ?
         `,[id])
         return rows
}

//INSERT REQUST
async function createOHP(idOrder,idProduct){
    const [result] = await connection.query(`
    INSERT INTO order_has_product (Order_idOrder,Product_idProduct)
    VALUES (?,?)
    `, [idOrder,idProduct])
    const id = result.insertId
    return getOHP(id);
}


//MODIFY REQUEST
async function modifyOHP(idOrder,idProduct,id){
    await connection.query(`
    UPDATE order_has_product
    SET Order_idOrder=?, Product_idProduct=?
    WHERE idOhp=?
    `,[idOrder,idProduct,id])
    return getOHP(id);
}

//DELETE REQUEST
async function deleteOHP(id){
    await connection.query(`
    DELETE FROM order_has_product
    WHERE idOhp=?
    `,[id])

    const result = await getOHP(id)
    
    if(result.length==0){
    return console.log('The Order_has_product by the id: '+ id+ ' has been succssefully removed')
    }
    else{
        return console.log('Something went wrong in the deletion of the Order_has_product by the id :'+ id)
    }
    
}

module.exports={
    getOHP: getOHP,
    getOHPs: getOHPs,
    createOHP : createOHP,
    modifyOHP : modifyOHP,
    deleteOHP : deleteOHP,
};


