import mongoose from 'mongoose'

function connect (): void {
  mongoose.Promise = Promise
  mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://airbnb-mongodb:27017/airbnb')
    .then(() => {
      console.log('Connected to database')
    })
    .catch(err => console.log(err))
  mongoose.connection.on('error', (error: Error) => console.log(error))
}

export default {
  connect
}
