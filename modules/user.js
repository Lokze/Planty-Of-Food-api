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

// SELECT USER BY EMAIL REQUEST TO ENSURE NO EMAIL IS DOUBLE
async function getUserByEmail(email) {
    const [rows] = await connection.query(`
         SELECT *
         FROM  user
         WHERE emailUser= ?
         `, [email]);
    return rows;
}

//INSERT REQUST
async function createUser(name,surname,email){
    const existingUser = await getUserByEmail(email);

    if (existingUser.length > 0) {
        throw new Error('User with the provided email already exists');
    }

    const [result] = await connection.query(`
    INSERT INTO user (nameUser,surnameUser,emailUser)
    VALUES (?,?,?)
    `, [name,surname,email])
    const id = result.insertId
    return getUser(id);
}


//MODIFY REQUEST
async function modifyUser(name,surname,email,id){
    const UsersWithEmail = await getUserByEmail(email);

    if (UsersWithEmail.length > 0 && UsersWithEmail[0].idUser !== id) {
        throw new Error('Another user with the same email already exists');
    }

    await connection.query(`
    UPDATE user
    SET nameUser=?, surnameUser=?, emailUser=?
    WHERE idUser=?
    `,[name,surname,email,id])
    return getUser(id);
}

//DELETE REQUEST
async function deleteUser(id){
    await connection.query(`
    DELETE FROM user
    WHERE idUser=?
    `,[id])

    const result = await getUser(id)
    
    if(result.length==0){
    return console.log('The user by the id: '+ id+ ' has been succssefully removed')
    }
    else{
        return console.log('Something went wrong in the deletion of the user by the id :'+ id)
    }
    
}

module.exports={
    getUser: getUser,
    getUsers: getUsers,
    createUser : createUser,
    modifyUser : modifyUser,
    deleteUser : deleteUser,
};


