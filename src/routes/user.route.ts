import express from 'express'
import userController from '../controllers/user.controller'
// import { isAuthenticated, isOwner } from '../middlewares'

export default (router: express.Router): void => {
  router.get('/api/users', userController.index)
  router.post('/api/users', userController.create)
}
