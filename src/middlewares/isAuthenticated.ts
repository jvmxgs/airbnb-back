import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import app from '../config/app'

function isAuthenticated (req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')

  if (token == null) {
    res.status(401).json({ message: i18n.__('auth.unauthorized') })
    return
  }

  try {
    const decoded = jwt.verify(token, app.secret)

    console.log(decoded)

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: i18n.__('auth.unauthorized') })
  }
}

export default isAuthenticated
