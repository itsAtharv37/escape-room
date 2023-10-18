const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const bcrypt = require('bcrypt')

const secretKey = process.env.authKey

const User = require('../models/user')

function authToken(req,res,next){
    const token = req.header('Authorizaion')
    if(!token){
        return res.status(401).send('No token provided.')
    }

    jwt.verify(token, secretKey, (err,user) => {
        if(err){
            return res.status(403).send("Your token is invalid")
        }

        req.user = user
        next()
    })
}

router.get('/protected-route', authToken, (res) => {
    res.json({ message: 'protected route'})
})

router.post('/login', async (req,res) => {
    const{username,password} = req.body

    try{
        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({message: "Invalid username"})
        }

        const passMatch = await bcrypt.compare(password,user.password)
        if(passMatch){
            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, secretKey)

            res.json({token})
        }else{
            res.status(401).json({message: 'Invalid password'})
        }
    } catch(error){
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
})

module.exports = router