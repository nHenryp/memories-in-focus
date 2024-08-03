const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username })
        if (userInDatabase) {
            return res.json({ error: 'Username already taken' })
        }
        const user = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 12)
        })
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET)
        res.status(201).json({ user, token })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
})





router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            })
            return res.status(200).json({ token, user })
        } else {
            return res.status(401).json({ error: 'Incorrect username or password' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


module.exports = router