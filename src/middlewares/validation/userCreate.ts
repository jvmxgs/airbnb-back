import { Request, Response, NextFunction } from 'express'
import { validationResult, body, ValidationError } from 'express-validator'
import i18n from 'i18n'

export const validateUserCreate = [
  body('fullName').trim().notEmpty().withMessage('validation.users.fullname_required'),
  body('birthDate').isISO8601().withMessage('validation.users.invalid_birth_date'),
  body('email').isEmail().withMessage('validation.users.invalid_email'),
  body('password').isLength({ min: 6 }).withMessage('validation.users.invalid_password'),
  body('role').isIn(['user', 'admin']).withMessage('validation.users.invalid_role'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errs = translateErrorMessages(errors.array())
      res.status(422).json({ errors: errs })
      return
    }
    next()
  }
]

function translateErrorMessages (errors: ValidationError[]): ValidationError[] {
  return errors.map((error): ValidationError => {
    error.msg = i18n.__(error.msg)
    return error
  })
}
