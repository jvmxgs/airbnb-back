import { Request, Response, NextFunction } from 'express'
import { validationResult, body, ValidationError } from 'express-validator'
import i18n from 'i18n'

export const validateAddressCreate = [
  body('country').trim().notEmpty().withMessage('validation.addresses.country_required'),
  body('state').trim().notEmpty().withMessage('validation.addresses.state_required'),
  body('city').trim().notEmpty().withMessage('validation.addresses.city_required'),
  body('street').trim().notEmpty().withMessage('validation.addresses.street_required'),
  body('postalCode').trim().notEmpty().isNumeric().withMessage('validation.addresses.postal_code'),

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
