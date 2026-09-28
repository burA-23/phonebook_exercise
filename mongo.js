const mongoose = require('mongoose')


const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4] 

const url = `mongodb+srv://briankimeli95_db_user:${password}@cluster0.nettauf.mongodb.net/phoneBook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url,{family: 4})

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

{/*const person = new Person({
  name: `${name}`,
  number : `${phone}`,
})

person.save().then(result =>{
  console.log(`Added ${person.name} ${person.number} to the phonebook!`)
  mongoose.connection.close()
})
*/}
if(process.argv.length < 4){
  Person.find({}).then(result =>{
    console.log('Phonebook: ')
    result.forEach(person=>{
      const name = person.name
      const phone = person.number
      console.log(name, phone)
    })
    process.exit(1)
    mongoose.connection.close()
  })
}
