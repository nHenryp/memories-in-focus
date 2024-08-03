const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Router files
const testJWTRouter = require('./controllers/test-jwt')
const usersRouter = require('./controllers/users')
const profilesRouter = require('./controllers/profiles')


//Middleware
const verifyToken = require('./middleware/verify-token.js')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`connected to mongoDB ${mongoose.connection.name}.`)
})

app.use(cors())

app.use(express.json())


//Routes go here
app.use('/test-jwt', testJWTRouter)
app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)

app.listen(3000, () => {
    console.log('the express app is ready')
})