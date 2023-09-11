import { Router } from 'express'
import addressController from '../controllers/address.controller'
import { validateAddressCreate } from '../middlewares/validation/addressCreate'

export default (router: Router): void => {
  router.get('/api/users/:userId/addresses', addressController.index)
  router.post('/api/users/:userId/addresses', validateAddressCreate, addressController.create)
}
