const jwt = require('jsonwebtoken')
const { validate } = require('../models/user')

const verifyToken = (req,res,next) => {
    try {
    
// extract the token from the authorization header
const token = req.headers.authorization.split(' ')[1]
// verify the token
const decoded = jwt.verify(token, process.env.JWT_SECRET)

req.user = decoded

//If the token is validate, we'll pss to the next middleware
        next()

    } catch (error) {
        console.error(error)  
    // If the token is not valid, unauthorize the request
        res.status(401).json({ error: 'Invalid authorization token.' });
    }
}

module.exports = verifyToken