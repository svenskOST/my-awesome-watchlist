import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   watchlist: { type: Array, required: false },
})

UserSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next()
   try {
      this.password = await bcrypt.hash(this.password, 10)
      next()
   } catch (error) {
      next(error)
   }
})

UserSchema.methods.comparePassword = async function (password) {
   return bcrypt.compare(password, this.password)
}

export default mongoose.model('User', UserSchema)
