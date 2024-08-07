import express from 'express'
import Item from '../models/Item.js'
const router = express.Router()

const authenticate = (req, res, next) => {
   const token = req.header('Authorization').replace('Bearer ', '')
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decoded.userId
      next()
   } catch (error) {
      res.status(401).json({ error: 'Please authenticate' })
   }
}

router.post('/', authenticate, async (req, res) => {
   try {
      const { title, description } = req.body
      const item = new Item({
         userId: req.userId,
         title,
         description,
      })
      await item.save()
      res.status(201).json(item)
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

router.get('/', authenticate, async (req, res) => {
   try {
      const item = await Item.find({ userId: req.userId })
      res.json(item)
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

router.put('/:id', authenticate, async (req, res) => {
   try {
      const { id } = req.params
      const { title, description, watched } = req.body
      const item = await Item.findOneAndUpdate(
         { _id: id, userId: req.userId },
         { title, description, watched },
         { new: true }
      )
      if (!item) return res.status(404).json({ error: 'Item not found' })
      res.json(item)
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

router.delete('/:id', authenticate, async (req, res) => {
   try {
      const { id } = req.params
      const item = await Item.findOneAndDelete({
         _id: id,
         userId: req.userId,
      })
      if (!item) return res.status(404).json({ error: 'Item not found' })
      res.json({ message: 'Item deleted' })
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
})

export default router
