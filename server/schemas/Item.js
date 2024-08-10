import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, required: true },
   title: { type: String, required: true },
   description: { type: String },
   watched: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Item', ItemSchema)
