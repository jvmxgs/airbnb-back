import { Router } from 'express'
import userController from '../controllers/user.controller'
import { validateUserCreate } from '../middlewares/validation/userCreate'
import isAuthenticated from '../middlewares/isAuthenticated'
// import { isAuthenticated, isOwner } from '../middlewares'

export default (router: Router): void => {
  router.get('/api/users', isAuthenticated, userController.index)
  router.post('/api/users', validateUserCreate, userController.create)
}
