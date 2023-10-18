const passport = require('passport')
const User = require('../models/user')

exports.login = (req,res,next) => {
    passport.authenticate('local',(err,user,info) => {
        if(err) return next(err)
        if(!user){
            return res.status(401).json({message: info.message})
        }

        req.login(user, (err) => {
            if(err) return next(err)

            return res.json({message: 'login successful'})
        })
    }) (req,res,next)
}

exports.register =  async (req,res) => {
    try{
        const{username,email,password} = req.body

        const existingUser = await User.findOne({email}) // registered email
        if(existingUser){
            return res.status(409).json({message: 'this email is already registered, please log in'})
        }

        const newUser = new User({username,email,password}) // TODO: hash password
        const user = await newUser.save

        res.status(201).json({
            message: 'Successfully registered user',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch(error){
        res.status(400).json({message: 'Registration failed', error: error.message})
    }
}