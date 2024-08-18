import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../schemas/User.js'

const router = express.Router()

export const authenticate = (request, response, next) => {
   const accessToken = request.header('Authorization').replace('Bearer ', '')

   if (!accessToken) {
      return response.status(403).json({ error: 'No token provided' })
   }

   jwt.verify(accessToken, JWT_ACCESS_SECRET, (error, decodedToken) => {
      if (error)
         return response.status(401).json({ error: 'Token is not valid' })
      request.userId = decodedToken
      next()
   })
}

router.post('/register', async (request, response) => {
   try {
      const { username, password } = request.body

      const exists = await User.findOne({ username })
      if (exists) {
         return response
            .status(409)
            .json({ error: 'Username is already taken ' })
      }

      const user = new User({ username, password })
      await user.save()
      response.status(201).json({ message: 'User created' })
   } catch (error) {
      response.status(400).json({ error: error.message })
   }
})

router.post('/login', async (request, response) => {
   try {
      const { username, password } = request.body

      const user = await User.findOne({ username })
      if (!user) {
         return response.status(404).json({ error: 'Could not find user' })
      }

      const valid = await user.comparePassword(password)
      if (!valid) {
         return response.status(401).json({ error: 'Invalid credentials' })
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

      response.json({ accessToken, refreshToken })
   } catch (error) {
      response.status(400).json({ error: error.message })
   }
})

router.post('/logout', async (request, response) => {
   try {
      const refreshToken = request.body
      const user = await User.findOne({ refreshToken })

      if (!user) {
         return response.status(403).json({ error: 'Invalid refresh token' })
      }

      user.refreshToken = null
      await user.save()

      response.status(200).json({ message: 'Logged out successfully' })
   } catch (error) {
      response.status(400).json({ error: error.message })
   }
})

export default router
