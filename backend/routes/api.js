const express = require('express')
const router = express.Router()
const User = require('../models/user')
const userController = require('../controllers/userController')

// const gameController = require('../controllers/gameController')
// const userController = require('../controllers/userController')

// router.post('/login', userController.login)
// router.post('/register' , userController.register)

router.get('/users', async(req,res) => { // users list
    try{
        const users = await User.find()
        res.json(users)
    }catch(error){
        console.error(500).json({message: 'Server error'})
    }
})

router.post('/users', async (req,res) => { // new user
    try{
        const{username,email,pasword} = req.body
        const newUser = new User({username,email,password})
        await newUser.save()
    } catch(error){
        console.error(error)
        res.status(500).json({message: 'server error'})
    }
})

router.get('/users/:username', async(req,res) => {
    try{
        const username = req.params.username

        const user = await User.findOne({username})
        if(user){
            res.json(user)
        } else{
            res.status(404).json({message: "User not found"})
        }
    } catch(error){
        console.error(error)
        res.status(500).json({message: 'Server errpr'})
    }
})

router.post('/login',userController.login)
router.post('/register',userController.register)

module.exports = router