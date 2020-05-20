const Pool = require('pg').Pool
var bcrypt = require('bcrypt');
const pool = new Pool({
	user:'postgres',
	host:'localhost',
	database:'postgres',
	password:'password',
	port:'5432',






})
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const getUsers = (request, response) => {
  pool.query('SELECT * FROM clients  ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getMessages = (request, response) => {
    pool.query('SELECT * FROM messages  ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createMessage = (request, response) => {
    const { name, email, phone, message } = request.body

    pool.query('INSERT INTO messages (name, email,phone,message) VALUES ($1,$2,$3,$4)', [name, email, phone, message], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Message added with ID: ${result.insertId}`)
    })
}

const createUser = (request, response) => {
    const { username, email, password } = request.body
    
   bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            throw err
        } else {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    throw err
                } else {
                    console.log(hash)
                    pool.query('INSERT INTO clients (username, email,password) VALUES ($1, $2,$3)', [username, email, hash], (error, result) => {
                        if (error) {
                            throw error
                        }
                        response.status(200).send(`User added with ID: ${result.insertId}`)
                    })
                }
            })
        }
    })  
}

const validatePass = (request, response) => {
    const username = request.params.username
    console.log(username)

    pool.query('Select * from clients where username = $1', [username], (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
}



module.exports = {
  getUsers,
    createUser,
    getMessages,
    createMessage,
    validatePass
 
}
