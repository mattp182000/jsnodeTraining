const express = require('express')
const morgan = require('morgan')
morgan('tiny')

const app = express()

app.use(express.json())
// app.use(morgan)

let persons = [
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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => {
    return person.id === id
  })
  if (person){
  response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
    const num = persons.length
    const date = new Date()
    const print = '<h2>Phonebook has info for ' + num + ' people </h2>' + '<p>' + date + '</p>'
    response.send(print)
}) 

const generateId = () =>{
  return (persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0)+1
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number){
    return response.status(400).json({
      error: 'Missing content'
  })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  for ( var i =0; i< persons.length; i++) {
    if (persons[i].name === person.name){
    return response.status(400).json({
      error: 'names must be unique'
    })
  }
  }
  
  persons = persons.concat(person)
  console.log(person)
  response.json(person)
})



const PORT = 3001

  app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)