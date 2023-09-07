import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
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
        res.status(401).json({ message: i18n.__('login.failed') })
        return
      }

      if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: i18n.__('login.failed') })
        return
      }

      const token = jwt.sign({ email }, app.secret)
      res.locals.user = { email }
      res.locals.token = token
      next()
    })
    .catch((error) => {
      console.error('Authentication error', error)
      res.status(500).json({ message: 'Internal server error' })
    })
}
