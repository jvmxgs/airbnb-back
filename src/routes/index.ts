import express from 'express'
import auth from './auth.route'
import users from './user.route'

const router = express.Router()

export default (): express.Router => {
  auth(router)
  users(router)

  return router
}
