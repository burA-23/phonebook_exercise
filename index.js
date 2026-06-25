const express = require('express')
const morgan = require('morgan') 
const app = express()
app.use(express.json())// a middleware - a function that handles request and response objects.
app.use(morgan('dev'))
app.use(express.static('dist'))


let persons = [

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

]

app.get('/info', (request, response)=>{
  const now = new Date()
  return response.send(`<p>Phonebook has infor for ${persons.length} people</p><br/>${now.toString()}`)
})
app.get('/api/persons', (request, response) =>{
  response.json(persons)
})

app.get('/abopi/persons/:id', (request, response) =>{
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) =>{
  const id = request.params.id 
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const generateId =()=>{
  const maxId = persons.length > 0 
    ? Math.max(...persons.map(p =>Number(p.id)))
    : 0
  return String(maxId + 1)
}


app.post('/api/persons',(request, response) =>{
  const body = request.body
  console.log(body)
  const nameExists = persons.some(p => p.name.toLowerCase()===body.name.toLowerCase())

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
    
  
  const person = {
    id:generateId(),
    name: body.name,
    number: body.number
  }
  

  persons.concat(person)
  console.log(person)
  response.status(201).json(person)

})

const PORT = process.env.PORT || 3001 
app.listen(PORT,() =>{
  console.log(`Listening on ${PORT}`)
})
