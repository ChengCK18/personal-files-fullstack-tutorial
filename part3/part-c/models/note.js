const mongoose = require('mongoose')
const url = process.env.MONGODB_URI //not good idea to hardcode URL into code
//`mongodb+srv://fullstack2:${password}@cluster0.vzaew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

console.log(`Connection to...${url}`)

mongoose.connect(url)
.then(result=>{
    console.log(`Successful connection to ${url}`)
})
.catch(error=>{
    console.log(`Error connecting to MongoDB: ${error.message}`)
})

const noteSchema = mongoose.Schema({
    content:String,
    date:Date,
    important:Boolean,
})

noteSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports=mongoose.model('Note',noteSchema)