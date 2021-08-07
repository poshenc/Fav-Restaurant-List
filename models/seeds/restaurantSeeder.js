const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const originalList = require('../../restaurant.json')
const restaurantData = originalList.results
const SEED_USER = [
  {
    name: 'User-1',
    email: 'user1@example.com',
    password: '12345678',
    restaurants: restaurantData.slice(0, 3)
  },
  {
    name: 'User-2',
    email: 'user2@example.com',
    password: '12345678',
    restaurants: restaurantData.slice(3, 6)
  }]


db.once('open', () => {
  SEED_USER.forEach(item => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(item.password, salt))
      .then(hash => User.create({
        name: item.name,
        email: item.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => Restaurant.create({
            userId,
            id: item.restaurants[i].id,
            name: item.restaurants[i].name,
            category: item.restaurants[i].category,
            image: item.restaurants[i].image,
            location: item.restaurants[i].location,
            phone: item.restaurants[i].phone,
            google_map: item.restaurants[i].google_map,
            rating: item.restaurants[i].rating,
            description: item.restaurants[i].description
          })
        ))
      })
      .then(() => {
        console.log('Seeder done.')
        process.exit()
      })
  })
})