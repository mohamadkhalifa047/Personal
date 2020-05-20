const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const db = require('./query')
var bcrypt = require('bcrypt');

const port = 3000
app.use(express.static('./index'))

app.use(morgan('short'))
const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})



app.get('/messages', db.getMessages)
app.get('/user', db.getUsers)
app.post('/createMessage', db.createMessage)
app.post('/users', db.createUser)
app.get('/password', db.validatePass)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
