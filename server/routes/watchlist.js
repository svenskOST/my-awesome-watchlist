import express from 'express'
import { authenticate } from './auth.js'
import User from '../schemas/User.js'
import { MovieDb } from 'moviedb-promise'

const router = express.Router()
const moviedb = new MovieDb('a4d42445d4f4ac7d764f7e53c4b5bff0')

router.get('/', authenticate, async (req, res) => {
   try {
      const user = await User.findOne({ _id: req.userId }).select('watchlist')
      const watchlist = user.watchlist

      for (let i = 0; i < watchlist.length; i++) {
         await moviedb.movieInfo({ id: watchlist[i].id }).then(result => {
            watchlist[i] = result
         })
      }

      res.json(watchlist)
   } catch (error) {
      res.status(500).json(error.message)
   }
})

router.post('/', authenticate, async (req, res) => {
   try {
      // add item to watchlist
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
})

/*
router.post('/', authenticate, async (request, response) => {
   try {
      const { title, description } = request.body
      const item = new Item({
         userId: request.userId,
         title,
         description,
      })
      await item.save()
      response.status(201).json(item)
   } catch (error) {
      response.status(400).json({ error: error.message })
   }
})

router.put('/:id', authenticate, async (request, response) => {
   try {
      const { id } = request.params
      const { title, description, watched } = request.body
      const item = await Item.findOneAndUpdate(
         { _id: id, userId: request.userId },
         { title, description, watched },
         { new: true }
      )
      if (!item) return response.status(404).json({ error: 'Item not found' })
      response.json(item)
   } catch (error) {
      response.status(400).json({ error: error.message })
   }
})

router.delete('/:id', authenticate, async (request, response) => {
   try {
      const { id } = request.params
      const item = await Item.findOneAndDelete({
         _id: id,
         userId: request.userId,
      })
      if (!item) return response.status(404).json({ error: 'Item not found' })
      response.json({ message: 'Item deleted' })
   } catch (error) {
      response.status(400).json({ error: error.message })
   }
})
*/

export default router
