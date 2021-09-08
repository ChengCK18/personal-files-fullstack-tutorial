const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url)
.then(result =>{
    console.log("Successful Connection!")
})
.catch(error=>{
    console.log(`Error in connection: ${error}`)
})

const personSchema = mongoose.Schema({
    name:String,
    phoneNumber:String
})

personSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports=mongoose.model('person',personSchema)

