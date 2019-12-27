const express = require("express");
const app = express();
var morgan = require('morgan')
const cors = require('cors')

//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
  morgan.token('body', (req,res) => {
    return JSON.stringify(req.body)
  })

app.use(cors())

app.use(express.json());      
app.use(express.urlencoded({ extended: true }));

var persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const length = persons.length;
  const date = new Date();
  const output = `Phonebook has info for ${length} people`;

  res.send(output + "\n" + date);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  let person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
 // const max = Math.max(...persons.map((p) => p.id))
  
  return Math.floor(Math.random() * (100 - 5 + 1)) + 5;
}

app.post("/api/persons", (req, res) => {
  const body = req.body

  if(Object.keys(req.body).length === 0) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  

  

  const person = {
    "name": body.name,
    "number": body.number,
    "id": generateId()
  }

  const check = (object) => object.name === body.name
  if(persons.some(check)) {
    return res.status(400).json({ 
      error: 'name already exist. It must be unique' 
    })
  } else if (!person.name || !person.number) {
    return res.status(400).json({ 
      error: 'missing values' 
    })
  }

  
  persons = persons.concat(person)

  res.json(persons)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id)

  console.log(persons)

  res.status(204).end()
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
