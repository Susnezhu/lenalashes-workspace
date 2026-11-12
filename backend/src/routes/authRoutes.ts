import { Router } from 'express'

import {
  login,
  logout,
  getLoggedUser,
} from '../controllers/authController.js'

import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/login', login)
router.post('/logout', authMiddleware, logout)
router.get('/me', authMiddleware, getLoggedUser)

export default router