import express from 'express'
import upload from '../middleware/multer.js'
import { addCustomization } from '../controllers/customizationController.js'

const router = express.Router()

// POST /api/customization/add
router.post('/add', upload.any(), addCustomization)

export default router
