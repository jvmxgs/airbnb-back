import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  fullName: String,
  birthDate: Date,
  email: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  validatedAt: {
    type: Date
  },
  validationToken: String
})

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (err) {
    const error = err as Error
    next(error)
  }
})

export default mongoose.model('User', userSchema)
