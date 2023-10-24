var connection = require('./mysql')


//SELECT * USERS REQUEST
 async function getUsers() {
    const [rows] = await connection.query("SELECT * FROM user")
    return rows
}



//SELECT SPECIFIC USER REQUEST
async function getUser(id){
    const [rows] = await connection.query(`
         SELECT *
         FROM  user
         WHERE idUser= ?
         `,[id])
         return rows
}

//INSERT REQUST
async function createUser(name,surname,email){
    const [result] = await connection.query(`
    INSERT INTO user (nameUser,surnameUser,emailUser)
    VALUES (?,?,?)
    `, [name,surname,email])
    const id = result.insertId
    return getUser(id);
}


module.exports={
    getUser: getUser,
    getUsers: getUsers,
    createUser : createUser,
};


