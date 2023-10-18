const express = require('express')
const router = express.Router()

const gameController = require('../controllers/gameController')
const userController = require('../controllers/userController')

router.post('/login', userController.login)
router.post('/register' , userController.register)

module.exports = router