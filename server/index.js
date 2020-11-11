require("dotenv").config()
const express = require("express")
const session= require("express-session")
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')

const app = express();

let {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
)
app.use(checkForSession)

//ENDPOINTS
//Swag
app.get('/api/swag', swagController.read);
//Auth
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

app.listen(SERVER_PORT, () =>{
    console.log(`Server firing on ${SERVER_PORT} boi`)
})

