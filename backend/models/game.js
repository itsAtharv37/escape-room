const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: String,
    description: String,
    tags: String
})

module.exports = mongoose.model('Game', gameSchema)