import { Router } from 'express'
import addressController from '../controllers/address.controller'
import { validateAddressCreate } from '../middlewares/validation/addressCreate'
import isAuthenticated from '../middlewares/isAuthenticated'

export default (router: Router): void => {
  router.get('/api/users/:userId/addresses', isAuthenticated, addressController.index)
  router.post('/api/users/:userId/addresses', isAuthenticated, validateAddressCreate, addressController.create)
}
