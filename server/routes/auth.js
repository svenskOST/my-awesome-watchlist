import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../schemas/User.js'

const router = express.Router()

export const authenticate = (req, res, next) => {
   const token = req.header('Authorization').replace('Bearer ', '')

   if (!token) {
      return res.status(403).json({ error: 'No token provided' })
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decoded.userId
      next()
   } catch (error) {
      res.status(401).json({ error: 'Token is not valid' })
   }
}

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
      if (!user) {
         return res.status(404).json({ error: 'That user does not exist' })
      }

      const valid = await user.comparePassword(password)
      if (!valid) {
         return res.status(401).json({ error: 'Invalid credentials' })
      }

      const accessToken = jwt.sign(
         { userId: user._id },
         process.env.JWT_SECRET,
         { expiresIn: '24h' }
      )
      const refreshToken = jwt.sign(
         { userId: user._id },
         process.env.JWT_SECRET,
         { expiresIn: '7d' }
      )

      user.refreshToken = refreshToken
      await user.save()

      res.json({ accessToken, refreshToken })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

router.post('/logout', async (req, res) => {
   try {
      const refreshToken = req.body
      const user = await User.findOne({ refreshToken })

      if (!user) {
         return res.status(403).json({ error: 'Invalid refresh token' })
      }

      user.refreshToken = null
      await user.save()

      res.status(200).json({ message: 'Logged out successfully' })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

export default router
