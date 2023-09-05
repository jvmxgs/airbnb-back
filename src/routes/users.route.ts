import express from 'express'
import userController from '../controllers/users.controller'
// import { isAuthenticated, isOwner } from '../middlewares'

export default (router: express.Router): void => {
  router.get('/api/users', userController.index)
}

// const router = express.Router()

// router.get('/', usersController.get)
/* router.post('/', usersController.create)
router.put('/:id', usersController.update)
router.delete('/:id', usersController.remove) */

// export default router
