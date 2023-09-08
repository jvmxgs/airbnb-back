import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/user.model'
import bcrypt from 'bcrypt'
import i18n from 'i18n'
import app from '../config/app'

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email })
    .then((user): void => {
      if (user === null) {
        res.status(401).json({ message: i18n.__('auth.failed') })
        return
      }

      if (user.validatedAt === null || user.validatedAt === undefined) {
        res.status(401).json({ message: i18n.__('auth.verify_account') })
        return
      }

      if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: i18n.__('auth.failed') })
        return
      }

      const token = jwt.sign({ email }, app.secret)
      res.locals.user = { email }
      res.locals.token = token

      res.json({ message: i18n.__('auth.login_success'), token })
      next()
    })
    .catch((error) => {
      console.error('Authentication error', error)
      res.status(500).json({ message: 'Internal server error' })
    })
}

export const validateAccount = (req: Request, res: Response, _next: NextFunction): void => {
  const validationToken = req.query.token as string

  try {
    jwt.verify(validationToken, app.secret) as JwtPayload
  } catch (_error) {
    res.send('Invalid or expired token')
    return
  }

  User.findOne({ validationToken })
    .then(user => {
      if (user === null) {
        res.send('Invalid or expired token')
        return
      }

      user.validatedAt = new Date()
      user.validationToken = undefined
      user.save().catch((error) => console.error(error))
      res.send('User validated')
    })
    .catch((error) => console.error(error))
}
