var connection = require('./mysql')


//ORDER PORDUCT SORT BY DATE 

async function getQueryDate(date){
    const [rows] = await connection.query(
    "SELECT o.idOrder, o.dateAdded, o.User_idUser, p.productName " +
    "FROM `order` AS o " +
    "JOIN order_has_product AS ohp ON o.idOrder = ohp.Order_idOrder " +
    "JOIN product AS p ON ohp.Product_idProduct = p.idProduct " +
    "WHERE o.dateAdded = ?",
    [date])
    return rows
}

//ORDER PORDUCT SORT BY PRODUCT NAME

async function getQueryProduct(product){
    const [rows] = await connection.query(
        "SELECT o.idOrder, o.dateAdded, o.User_idUser, p.productName " +
        "FROM `order` AS o " +
        "JOIN order_has_product AS ohp ON o.idOrder = ohp.Order_idOrder " +
        "JOIN product AS p ON ohp.Product_idProduct = p.idProduct " +
        "WHERE p.productName = ?",
        [product])
        return rows
}

//ORDER PORDUCT SORT BY PRODUCT NAME and DATE
async function getQueryBoth(product,date){
    const [rows] = await connection.query(
        "SELECT o.idOrder, o.dateAdded, o.User_idUser, p.productName " +
        "FROM `order` AS o " +
        "JOIN order_has_product AS ohp ON o.idOrder = ohp.Order_idOrder " +
        "JOIN product AS p ON ohp.Product_idProduct = p.idProduct " +
        "WHERE p.productName = ? AND o.dateAdded = ?",
        [product,date])
        return rows
}

module.exports={
    getQueryDate : getQueryDate,
    getQueryProduct: getQueryProduct,
    getQueryBoth: getQueryBoth,
}