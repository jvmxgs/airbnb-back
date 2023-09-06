import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  fullName: String,
  birthDate: Date,
  email: String,
  role: String,
  password: String
})

userSchema.pre('save', async function (next) {
  try {
    if (typeof this.password !== 'string' || this.password.trim() === '') {
      throw new Error('Password is required')
    }

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
