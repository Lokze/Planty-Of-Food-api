var connection = require('./mysql')

//SELECT * ORDER REQUEST
async function getOrders() {
    const [rows] = await connection.query("SELECT * FROM `order`")
    return rows
}

//SELECT SPECIFIC ORDER REQUEST
async function getOrder(id){
    const [rows] = await connection.query(
        'SELECT * FROM  `order` WHERE idOrder= ?'
        ,[id])
         return rows
}

//INSERT REQUST
async function createOrder(date,idUser){
    const [result] = await connection.query(
    'INSERT INTO `order` (dateAdded, User_idUser) VALUES (?,?)'
    , [date, idUser])
    const id = result.insertId
    return getOrder(id);
}

//MODIFY REQUEST
async function modifyOrder(date,idUser,id){
    await connection.query(
        'UPDATE `order` SET dateAdded=?, User_idUser=? WHERE idOrder=?'
    ,[date,idUser,id])
    return getOrder(id);
}

//DELETE REQUEST
async function deleteOrder(id){
    await connection.query(
    'DELETE FROM `order` WHERE idOrder=?'
    ,[id])

    const result = await getOrder(id)
    
    if(result.length==0){
    return console.log('The order by the id: '+ id+ ' has been succssefully removed')
    }
    else{
        return console.log('Something went wrong in the deletion of the order by the id :'+ id)
    }
    
}


module.exports = {
    getOrders : getOrders,
    getOrder : getOrder,
    createOrder : createOrder,
    modifyOrder : modifyOrder,
    deleteOrder : deleteOrder,
}
