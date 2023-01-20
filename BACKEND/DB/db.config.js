
const mongoose = require('mongoose')

mongoose.connect('YOUR MONGODB CONNECTION URL')

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected')
})