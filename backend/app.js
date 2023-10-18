const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const mongoose = require('mongoose')
const dbConf = require('./config/database')
mongoose.connect(dbConf.url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB Atlas")
}).catch((err) => {
    console.error("Error connecting to MongoDB atlas: ", err)
})

app.use(bodyParser.json())

const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})