
const { request, response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const password = process.argv[2]
const url =
`mongodb+srv://fullstack:${password}@cluster0.vzaew.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})


const Note = mongoose.model('Note', noteSchema)

app.use(cors())
app.use(express.json())

app.get('/',(request,response) =>{
  response.send('<h1>Konnichiwa World!</h1>')
})

app.get('/api/notes',(request,response) =>{

  Note.find({}).then(notes =>{
    response.json(notes)
  })

})

app.get('/api/notes/:id',(request,response) => {
  //api/notes/SOMETHING , SOMETHING refers to arbitrary string
  //SOMETHING can be accessed through request.params.id
  const id = Number(request.params.id) 
  //Number required to convert string to Number for .find comparison to 
  //be true
  const note = notes.find(note => note.id === id)
  if(note){
   response.json(note)
  }
  else{
    response.status(404).end()
  }
})


app.delete('/api/notes/:id',(request,response) =>{
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


app.post('/api/notes',(request,response) => {
  const body = request.body
 
  if(!body.content){ //if there is no content provided by the request
    return response.status(400).json({error:'content missing'})
  }

  const note = {
    content: body.content,
    important: body.important || false, // if important property is not defined or FALSE, will default to false
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat (note)

  response.json(note)
})


const generateId = () =>{
  const maxId = notes.length > 0 ? Math.max(...notes.map(n =>n.id)):0
  return maxId + 1
}



const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)