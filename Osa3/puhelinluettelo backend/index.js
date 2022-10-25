require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/person')

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345", 
      "id": 3
    },
    { 
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    },
    {
      "name": "Kasper Eloranta",
      "number": "0445666828",
      "id": 5
    }
  ]

// ylhäältä
/*
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
*/

// mongoDB
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//ylhäältä
/*
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
*/
//mongoDB
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if(!body.number){
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    const person = {
      name: body.name,
      number: body.number, 
      id: generateId(),
    }
    persons = persons.concat(person)
  
    response.json(person)
  })