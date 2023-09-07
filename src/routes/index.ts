import express from 'express'
import login from './login.route'
import users from './user.route'

const router = express.Router()

export default (): express.Router => {
  login(router)
  users(router)

  return router
}
