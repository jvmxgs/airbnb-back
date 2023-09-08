import mongoose from 'mongoose'

const listingsAndReviewSchema = new mongoose.Schema({
  name: String,
  summary: String,
  description: String,
  property_type: String,
  minimum_nights: Number,
  maximum_nights: Number,
  bedrooms: Number,
  beds: Number,
  number_of_reviews: Number,
  bathrooms: Number,
  price: Number,
  images: Object,
  reviews: Object
},
{
  collection: 'listingsAndReviews'
})

export default mongoose.model('listingsAndReviews', listingsAndReviewSchema)
