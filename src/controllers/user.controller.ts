import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import i18n from 'i18n'
import mailer from '../config/mailer'
import jwt from 'jsonwebtoken'
import app from '../config/app'

function index (_req: Request, res: Response, next: NextFunction): void {
  try {
    res.json({ response: 'success' })
  } catch (err) {
    const error = err as Error
    console.error('Error while getting users', error.message)
    next(error)
  }
}

function create (req: Request, res: Response, next: NextFunction): void {
  const { fullName, birthDate, email, password, passwordConfirm, role } = req.body

  const newUser = new User({ fullName, birthDate, email, password, role })
  newUser.validatedAt = undefined

  if (password !== passwordConfirm) {
    res.status(400).json({
      errors: [{
        path: 'password',
        msg: i18n.__('validation.users.password_not_match')
      }]
    })
    return
  }

  newUser.save()
    .then((user) => {
      res.status(201).json({ message: i18n.__('users.created') })

      const payload = {
        userId: user._id,
        email: user.email
      }

      const token = jwt.sign(payload, app.secret, { expiresIn: '24h' })

      newUser.validationToken = token
      newUser.save().catch(error => console.error(error))

      if (process.env.APP_URL !== undefined && process.env.PORT !== undefined) {
        const validationLink = `${process.env.APP_URL}:${process.env.PORT}/validate?token=${token}`

        const mailOptions = {
          from: app.secret,
          to: req.body.email,
          subject: 'Account Validation',
          html: `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Validation</title>
            <style>
              /* Add your email styles here */
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
                margin: 0;
              }
          
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 20px;
              }
          
              h1 {
                color: #333;
              }
          
              p {
                font-size: 16px;
                line-height: 1.6;
                color: #666;
              }
          
              .btn {
                display: inline-block;
                background-color: #007bff;
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
              }
          
              .btn:hover {
                background-color: #0056b3;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome to Our Application!</h1>
              <p>Thank you for signing up. To activate your account, please click the button below:</p>
              <a href="${validationLink}" target="_blank" class="btn">Validate Account</a>
              <p>If you didn't request this, you can safely ignore this email.</p>
            </div>
          </body>
          </html>
          `
        }

        mailer
          .createTransporter()
          .sendMail(mailOptions)
          .catch(error => console.error(error))
      }
    })
    .catch((error) => {
      if (error.code === 11000 && 'email' in error?.keyPattern) {
        res.status(400).json({
          errors: [{
            path: 'email',
            msg: i18n.__('users.email_in_use')
          }]
        })
        return
      }

      next(error)
    })
}

export default {
  index,
  create
}
