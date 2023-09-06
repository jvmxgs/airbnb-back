import express from 'express'
import userController from '../controllers/user.controller'
import { validateUserCreate } from '../middlewares/validation/userCreate'
// import { isAuthenticated, isOwner } from '../middlewares'

export default (router: express.Router): void => {
  router.get('/api/users', userController.index)
  router.post('/api/users', validateUserCreate, userController.create)
}
