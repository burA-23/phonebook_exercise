const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI 

console.log('Connecting to MongoDB')
mongoose.connect(url, {family: 4})
  .then(result=>{
    console.log('Connected to MongoDB')
  })
  .catch(error =>{
    console.log('Error connecting to MongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength: [5, 'Must be atleast 5, got {VALUE}'], 
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{7,8}$/.test(v)
      },
      message: props => `${props.value} is not a valid Phone Number!`
    },
    required: [true, 'User phone number is required!'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports= mongoose.model('Person', personSchema)
