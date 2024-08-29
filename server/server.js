import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import watchlistRoutes from './routes/watchlist.js'

console.log('maw-server starting')
console.log(`maw-server running on node ${process.version}`)

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/watchlist', watchlistRoutes)

mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => {
      console.log('Connected to maw-cluster')
   })
   .catch(error => {
      console.error('Error connecting to maw-cluster', error)
   })

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`)
})
