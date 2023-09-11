import { Router } from 'express'
import listingsAndReviewsController from '../controllers/listingsAndReviews.controller'

export default (router: Router): void => {
  router.get('/api/listings-and-reviews', listingsAndReviewsController.index)
}
