import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  country: String,
  state: String,
  city: String,
  street: String,
  postalCode: Number,
  date: Date
})

export default mongoose.model('address', addressSchema)
