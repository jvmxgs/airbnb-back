import { Router } from 'express'
import { authenticateUser } from '../controllers/login.controller'
import i18n from 'i18n'

export default (router: Router): void => {
  router.post('/login', authenticateUser, (_req, res) => {
    const token = res.locals.token
    res.json({ message: i18n.__('auth.login_success'), token })
  })
}
