const Restaurant = require('../restaurant')
const originalList = require('../../restaurant.json')
const seed = originalList.results

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  seed.forEach((restaurant) => {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
})