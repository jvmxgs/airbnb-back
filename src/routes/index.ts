import express from 'express'
import addresses from './address.route'
import auth from './auth.route'
import users from './user.route'
import listingsAndReviews from './listingsAndReviews.route'

const router = express.Router()

export default (): express.Router => {
  auth(router)
  users(router)
  addresses(router)
  listingsAndReviews(router)

  return router
}
