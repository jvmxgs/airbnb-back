'use strict'

Object.defineProperty(exports, '__esModule', { value: true })
const auth1 = require('../middlewares/auth')
exports.default = (router) => {
  router.post('/login', auth1.authenticateUser, (_req, res) => {
    const { username } = res.locals.user
    const token = res.locals.token
    res.json({ message: 'Login successful', username, token })
  })
}
