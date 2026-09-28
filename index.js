require('dotenv').config() // first change
const express = require('express')
const morgan = require('morgan') 
const Person = require('./models/person')
const app = express()
app.use(express.json())// a middleware - a function that handles request and response objects.
//app.use(morgan('dev'))
app.use(express.static('dist'))


{/*let persons = [
  

    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }

]*/}

app.get('/info', (request, response)=>{
  const now = new Date()
  return response.send(`<p>Phonebook has infor for ${persons.length} people</p><br/>${now.toString()}`)
})
app.get('/api/persons', (request, response) =>{
  Person.find({}).then(persons =>{
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) =>{
  Person.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person)
      } else{
        response.status(404).end()
      }
    })
    .catch(error =>next(error))
})
  {/* const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person){
    response.json(person)
  }else{
    response.status(404).end()
  }*/}


app.delete('/api/persons/:id', (request, response, next) =>{
  Person.findByIdAndDelete(request.params.id)
    .then(result =>{
      response.status(204).end()
    })
    .catch(error=> next(error))
})

{/*const generateId =()=>{
  const maxId = persons.length > 0 
    ? Math.max(...persons.map(p =>Number(p.id)))
    : 0
  return String(maxId + 1)
}*/}


app.post('/api/persons',(request, response) =>{
  const body = request.body
  console.log(body)
  {/*const nameExists = persons.some(p => p.name.toLowerCase()===body.name.toLowerCase())

  if(!body.number || !body.name){// the body.name is now irrelevant because it is represented in the nameExists variable.
    return response.status(400).json({
      error:"Either/or name & number missing!"
      })
  }else if(nameExists){
    return response.status(400).json({
      error: "Name already exists!"
    })
  }
  
  {/*else if(body.name){// the error exists here not yet initialized person
    return response.status(400).json({
      error: "Contact already exists!"
    })*/}
    
  
  const person = new Person ({
    //id:generateId(),
    name: body.name,
    number: body.number,
  })

  person.save().then(savedContact => {
    response.json(savedContact)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body
  Person.findById(request.params.id)
    .then(person =>{
      if(!person){
        response.status(404).end()
      } 
      person.name = name
      person.number = number 

      return person.save().then(updatedContact =>{
        response.json(updatedContact)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) =>{
  if(error.name === 'CastError'){
    response.status(400).send({error: 'Malformated error'})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001 
app.listen(PORT, '0.0.0.0',() =>{
  console.log(`Listening on ${PORT}`)
})
