import { Router } from 'express'
import { authenticateUser, validateAccount } from '../controllers/auth.controller'

export default (router: Router): void => {
  router.post('/api/login', authenticateUser)

  router.get('/validate', validateAccount)
}
