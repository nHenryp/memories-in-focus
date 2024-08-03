const express = require('express')
const router = express.Router()
const User = require('../models/user')
const verifyToken = require('../middleware/verify-token')


router.get('/:userId', verifyToken, async (req, res) => {
   try {
    if (req.user._id !== req.params.userId){
        return res.status(401).json({ message: 'Unauthorized'})
    }
    const user = await User.findById(req.params.userId)
    if (!user) return res.status(404).json({message: 'Profile not found.'})
        return res.json({user})
   } catch (error) {
    console.error(error)
    return res.status(500).json({message:error.message})
   }

})


module.exports = router