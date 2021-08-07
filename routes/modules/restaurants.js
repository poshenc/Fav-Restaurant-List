const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant.js')

//新增餐廳之routing
router.get('/new', (req, res) => {
  return res.render('new')
})

//search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      restaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurants: restaurants, keyword: keyword })
    })
    .catch((error) => console.error(error))
})

//詳細資料之routing
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//edit資料之routing
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

//使用者填寫新餐廳，新增資料庫資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, image, location, phone, google_map, rating, description } = req.body

  return Restaurant.create({ userId, name, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//使用者edit餐廳，修改資料庫資料 (Update for RESTful APL)
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurants => {
      restaurants.name = name
      restaurants.category = category
      restaurants.image = image
      restaurants.location = location
      restaurants.phone = phone
      restaurants.google_map = google_map
      restaurants.rating = rating
      restaurants.description = description
      return restaurants.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

//使用者delete餐廳，修改資料庫資料(Update for RESTful APL)
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router

