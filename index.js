require('dotenv').config()
const express = require("express");
const app = express();
var morgan = require('morgan')
const cors = require('cors')
const path = require('path');
const Person = require('./models/people')

app.use(express.static(path.join(__dirname, '/client')));

//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
  morgan.token('body', (req,res) => {
    return JSON.stringify(req.body)
  })

app.use(cors())

app.use(express.json());      
app.use(express.urlencoded({ extended: true }));  

app.get("/api/persons", (req, res) => {
  console.log('get Person')
  Person.find({}).then(person => {
    res.json(person.map(person => person.toJSON()))
  })
});

app.get("/info", (req, res) => {
  Person.find({}).then(person => {
    const length = person.length
    const date = new Date();
    const output = `Phonebook has info for ${length} people`;
    res.end(output + "\n" + date);
});

});

app.get("/api/persons/:id", (req, res, next) => {

  Person.findById(req.params.id).then(person => {
    if (person) {
    res.json(person.toJSON())
  } else {
    res.status(404).end() 
  }
  })
  .catch(error => next(error))


/*   const id = Number(req.params.id);
  let person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  } */


});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body

  const person = {
    "name": body.name,
    "number": body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { number: body.number})
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const generateId = () => {
 // const max = Math.max(...persons.map((p) => p.id))
  
  return Math.floor(Math.random() * (100 - 5 + 1)) + 5;
}

app.post("/api/persons", (req, res, next) => {
  const body = req.body

  if(Object.keys(req.body).length === 0) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }  

  const person = new Person({
    "name": body.name,
    "number": body.number,
  })

  //const check = (object) => object.name === body.name
  /* if(persons.some(check)) {
    return res.status(400).json({ 
      error: 'name already exist. It must be unique' 
    })
  } else if (!person.name || !person.number) {
    return res.status(400).json({ 
      error: 'missing values' 
    })
  } */

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
  .catch(error => next(error))

  
})

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
/*   persons = persons.filter(person => person.id !== id)

  console.log(persons)

  res.status(204).end() */
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
