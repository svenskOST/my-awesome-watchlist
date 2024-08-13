import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../schemas/User.js'

const router = express.Router()

export const authenticate = (req, res, next) => {
   const accessToken = req.header('Authorization').replace('Bearer ', '')

   if (!accessToken) {
      return res.status(403).json({ error: 'No token provided' })
   }

   jwt.verify(accessToken, JWT_ACCESS_SECRET, (err, userId) => {
      if (err) return res.status(401).json({ err: 'Token is not valid' })
      req.userId = userId
      next()
   })
}

router.post('/register', async (req, res) => {
   try {
      const { username, password } = req.body

      const exists = await User.findOne({ username })
      if (exists) {
         return res.status(409).json({ err: 'Username is already taken ' })
      }
      
      const user = new User({ username, password })
      await user.save()
      res.status(201).json({ msg: 'User created' })
   } catch (err) {
      res.status(400).json({ err: err.message })
   }
})

router.post('/login', async (req, res) => {
   try {
      const { username, password } = req.body

      const user = await User.findOne({ username })
      if (!user) {
         return res.status(404).json({ err: 'Could not find user' })
      }

      const valid = await user.comparePassword(password)
      if (!valid) {
         return res.status(401).json({ err: 'Invalid credentials' })
      }

      const accessToken = jwt.sign(
         { userId: user._id },
         process.env.JWT_ACCESS_SECRET,
         { expiresIn: '24h' }
      )
      const refreshToken = jwt.sign(
         { userId: user._id },
         process.env.JWT_REFRESH_SECRET,
         { expiresIn: '7d' }
      )

      user.refreshToken = refreshToken
      await user.save()

      res.json({ accessToken, refreshToken })
   } catch (err) {
      res.status(400).json({ err: err.message })
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
   } catch (err) {
      res.status(400).json({ err: err.message })
   }
})

export default router
