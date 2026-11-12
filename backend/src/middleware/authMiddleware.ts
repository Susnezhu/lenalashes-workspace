import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

interface TokenPayload {
  userId: number
}

declare global {
  namespace Express {
    interface Request {
      userId?: number
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction,) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication required',
      })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        message: 'Invalid token',
      })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload

    if (!Number.isInteger(decoded.userId)) {
      return res.status(401).json({
        message: 'Invalid token',
      })
    }

    req.userId = decoded.userId

    next()
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token',
    })
  }
}