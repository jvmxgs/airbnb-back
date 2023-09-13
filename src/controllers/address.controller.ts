import { Request, Response, NextFunction } from 'express'
import Address from '../models/address.model'
import i18n from 'i18n'

function index (req: Request, res: Response, _next: NextFunction): void {
  Address.find({ user: req.params.userId })
    .sort({ date: -1 })
    .select('country state city street postalCode date')
    .lean()
    .exec()
    .then((addresses) => {
      res.json({
        data: addresses
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Error fetching listings', error: err })
    })
}

function create (req: Request, res: Response, next: NextFunction): void {
  const { country, state, city, street, postalCode } = req.body
  const user = req.params.userId
  const date = Date.now()
  const newAddress = new Address({ country, state, city, street, postalCode, user, date })

  newAddress.save()
    .then((address) => {
      res.status(201).json({ message: i18n.__('addresses.created'), address })
    })
    .catch((error) => {
      next(error)
    })
}

export default {
  index,
  create
}
