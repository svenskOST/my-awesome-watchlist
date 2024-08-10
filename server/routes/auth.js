import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const router = express.Router()

router.post('/register', async (req, res) => {
   try {
      const { username, password } = req.body
      const user = new User({ username, password })
      await user.save()
      res.status(201).json({ message: 'User created' })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

router.post('/login', async (req, res) => {
   try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user || !(await user.comparePassword(password))) {
         return res.status(401).json({ error: 'Invalid credentials' })
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
         expiresIn: '1h',
      })
      res.json({ token })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

export default router
