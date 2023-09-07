import { Router } from 'express'
import { authenticateUser, validateAccount } from '../controllers/auth.controller'

export default (router: Router): void => {
  router.post('/login', authenticateUser)

  router.get('/validate', validateAccount)
}
