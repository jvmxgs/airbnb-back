import express from 'express'

import users from './users.route'

const router = express.Router()

export default (): express.Router => {
  users(router)

  return router
}
