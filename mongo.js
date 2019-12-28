const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const dbName = 'phonebook'
const password = process.argv[2]
const name = String(process.argv[3])
const number = String(process.argv[4])

const url =
  `mongodb+srv://fullstack:${password}@cluster0-3dsja.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
  printPeople()
} else if (process.argv.length === 5) {
  addPerson()
} else {
  console.log(process.argv.length)
  console.log('please give all arguments. name and number')
  process.exit(1)
}

function addPerson () {
  
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  
  })
}

//process.exit(1)

function printPeople() {
  console.log('phonebook:')
    Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  }) 
}




