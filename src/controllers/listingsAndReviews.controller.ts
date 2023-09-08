import { Request, Response, NextFunction } from 'express'
import ListingsAndReview from '../models/listingsAndReview.model'

function index (req: Request, res: Response, _next: NextFunction): void {
  const pageParam = req.query.page as string
  const perPageParam = req.query.perPage as string

  const page = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam)
  const limit = isNaN(parseInt(perPageParam)) ? 10 : parseInt(perPageParam)

  const skip = (page - 1) * limit

  ListingsAndReview.find()
    .select('name summary description property_type minimum_nights maximum_nights bedrooms beds number_of_reviews bathrooms price images')
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
    .then((listings) => {
      ListingsAndReview.countDocuments().then((totalListings) => {
        const totalPages = Math.ceil(totalListings / limit)

        res.json({
          data: listings,
          total: listings.length,
          currentPage: page,
          totalPages
        })
      }).catch((err) => console.error(err))
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Error fetching listings', error: err })
    })
}

export default {
  index
}
