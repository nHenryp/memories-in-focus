const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')




mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`connected to mongoDB ${mongoose.connection.name}.`)
})

app.use(cors())
app.use(express.json())



app.use('/users', usersRouter)

app.listen(3000, () => {
    console.log('the express app is ready')
})