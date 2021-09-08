
const { request, response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Note = require('./models/note') //import the Note model

app.use(cors())
app.use(express.json())




app.get('/',(request,response) =>{
  response.send('<h1>Konnichiwa World!</h1>')
})

app.get('/api/notes',(request,response) =>{

  Note.find({}).then(notes =>{
    response.json(notes)
    mongoose.connection.close()
  })

})

app.get('/api/notes/:id',(request,response) => {
  //request.params.id
  //const id = Number(request.params.id) 
  Note.findById(request.params.id).then(note=>{
    response.json(note)
  })
})


app.post('/api/notes',(request,response) => {
  const body = request.body
 
  if(!body.content){ //if there is no content provided by the request
    return response.status(400).json({error:'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false, // if important property is not defined or FALSE, will default to false
    date: new Date(),
  })

 note.save().then(savedNote=>{
    response.json(savedNote)
 })

})

app.delete('/api/notes/:id',(request,response) =>{
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})





const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)