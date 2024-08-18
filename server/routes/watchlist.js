import express from 'express'
import authenticate from './auth.js'

const router = express.Router()

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

router.get('/', authenticate, async (request, response) => {
   try {
      const item = await Item.find({ userId: request.userId })
      response.json(item)
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
