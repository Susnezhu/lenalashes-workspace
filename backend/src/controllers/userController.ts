
import type { Request, Response } from 'express'

import { sequelize } from '../config/database.js'

import User from '../models/Users.js'
import UserCredentials from '../models/UserCredentials.js'

import argon2 from 'argon2'

// GET /api/users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'name',
        'role',
        'preferredLanguage',
        'isActive',
      ],
    })

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' })
  }
}

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }

    const user = await User.findByPk(id, {
      attributes: [
        'id',
        'name',
        'role',
        'preferredLanguage',
        'isActive',
      ],
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user' })
  }
}

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction()

  try {
    const {
      name,
      role,
      preferredLanguage,
      username,
      password,
    } = req.body

    // Hash password
    const passwordHash = await argon2.hash(password)

    // Create employee
    const user = await User.create(
      {
        name,
        role,
        preferredLanguage,
        isActive: true,
      },
      { transaction },
    )

    // Create login credentials
    await UserCredentials.create(
      {
        userId: user.id,
        username,
        passwordHash,
      },
      { transaction },
    )

    await transaction.commit()

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        preferredLanguage: user.preferredLanguage,
        isActive: user.isActive,
      },
    })
  } catch (error) {
    await transaction.rollback()

    res.status(500).json({
      message: 'Failed to create user',
    })
  }
}