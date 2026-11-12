import type { Request, Response } from 'express'
import argon2 from 'argon2'

import User from '../models/Users.js'
import UserCredentials from '../models/UserCredentials.js'
import { generateToken } from '../utils/generateToken.js'

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Username and password are required',
      })
    }

    const credentials = await UserCredentials.unscoped().findOne({
      where: { username: username.trim() },
    })

    if (!credentials) {
      return res.status(401).json({
        message: 'Invalid username or password',
      })
    }

    const passwordIsValid = await argon2.verify(
      credentials.passwordHash,
      password,
    )

    if (!passwordIsValid) {
      return res.status(401).json({
        message: 'Invalid username or password',
      })
    }

    const user = await User.findByPk(credentials.userId)

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: 'Invalid username or password',
      })
    }

    const token = generateToken(user.id)

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({
      message: 'Failed to login',
    })
  }
}

// POST /api/auth/logout
export const logout = async (_req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Logout successful',
  })
}

// GET /api/auth/me
export const getLoggedUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.userId)

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: 'User not found or inactive',
      })
    }

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
      },
    })
  } catch (error) {
    console.error('Get logged user error:', error)

    return res.status(500).json({
      message: 'Failed to get logged user',
    })
  }
}