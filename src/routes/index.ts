import express from 'express'
import auth from './auth.route'
import users from './user.route'
import listingsAndReviews from './listingsAndReviews.route'

const router = express.Router()

export default (): express.Router => {
  auth(router)
  users(router)
  listingsAndReviews(router)

  return router
}
