
const config = require('./utils/config')
//const http = require('http')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const mongoose = require('mongoose')


mongoose.connect(config.MONGODB_URI).then(result => {
    console.log(`Successful Connection to MongoDB ${result}`)

}).catch(error => {
    console.log(`Error connecting to MongoDB ${error}`)
})


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})