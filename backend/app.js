const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const dbConf = require('./config/datebase')
mongoose.connect(dbConf.url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(bodyParser.json())

const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})