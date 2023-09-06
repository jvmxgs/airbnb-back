import { Request, Response, NextFunction } from 'express'
import { validationResult, body } from 'express-validator'

export const validateUserCreate = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('birthDate').isISO8601().withMessage('Invalid date format'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['user', 'admin']).withMessage('Invalid user role'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
    }
    next()
  }
]
