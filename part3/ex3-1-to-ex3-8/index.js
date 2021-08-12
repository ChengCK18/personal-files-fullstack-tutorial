const { request, response } = require('express')
const express = require ('express')
const cors = require ('cors')
const app = express()


//To parse raw data into JavaScript object and place into request.body
app.use(express.json())

//To allow cross origin resource sharing
app.use(cors())



//morgan middleware for logging purpose
const morgan = require('morgan')
morgan.token('body',(req,res)=>{
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//custom made middleware logger
const requestLogger = (request,response,next) =>{
   
    console.log('Method: ',request.method)
    console.log('Path: ',request.path)
    console.log('Body: ',request.body)
    console.log('----------')
    
    next()
}

//app.use(requestLogger)

let phoneBook = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/',(request,response) =>{
    response.send('<h1> Hey!!!!!!!!!</h1>')
})

app.get('/info',(request,response) =>{
    const totalContact = phoneBook.length
    const currentDate = new Date()
    response.send(`Phonebook has info for ${totalContact} people <br>
    Request received on => ${currentDate}`)
})

app.get('/api/persons',(request,response) =>{
    response.json(phoneBook)
})

app.get('/api/persons/:id',(request,response) =>{
    const userId = Number(request.params.id)
    const userIdContact = phoneBook.find(contact => contact.id === userId)
    
    
    if(userIdContact){ //true if a contact is found
        response.json(userIdContact)
    }
    else{
        response.status(404).end()
    } 
})



app.delete('/api/persons/:id',(request,response) =>{
    const userId = Number(request.params.id)
    phoneBook = phoneBook.filter(contact => contact.id !== userId)

    response.status(204).end()
})

app.post('/api/persons',(request,response) =>{
    const body = request.body

    if(!body.name || !body.number){
        response.status(400).json({error:'Name or number field is missing'})
    }
    else if (phoneBook.find(contact => contact.name === body.name)){
        response.status(400).json({error:'Duplicate name is detected, please use other unique name'})
    }
    else{
        const newContact =
        {
            id: generateId(),
            name:body.name,
            number:body.number
        }

        phoneBook = phoneBook.concat(newContact)
        response.json(phoneBook)
        //response.status(200).end()
    }

    

})

const generateId = () =>{
    return Math.floor(Math.random() * 1000000)
}


const unknownEndpoint = (request,response) =>{
    response.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)