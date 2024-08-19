import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../schemas/User.js'

const router = express.Router()

export const authenticate = (req, res, next) => {
   const accessToken = req.header('Authorization').replace('Bearer ', '')

   jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (error, decodedToken) => {
      if (error) return res.status(401).json({ error: 'Invalid or missing token' })
      req.userId = decodedToken
      next()
   })
}

router.post('/authenticate', authenticate, (_req, res) => {
   res.status(200).json({ message: 'Yeah you good' })
})

router.post('/register', async (req, res) => {
   try {
      const { username, password } = req.body

      const exists = await User.findOne({ username })
      if (exists) {
         return res.status(409).json({ error: 'Username is already taken ' })
      }

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
      if (!user) {
         return res.status(404).json({ error: 'Could not find user' })
      }

      const valid = await user.comparePassword(password)
      if (!valid) {
         return res.status(401).json({ error: 'Invalid credentials' })
      }

      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
         expiresIn: '7d',
      })

      res.json({ accessToken })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

export default router
