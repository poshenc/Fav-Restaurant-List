const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
const port = 3000
const Restaurant = require('./models/restaurant.js')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

// 取出 Restaurant model 裡的所有資料
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
//詳細資料routing
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(req.params.id)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

//edit資料routing
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(req.params.id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

//使用者填寫新餐廳，新增資料庫資料
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({ name, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//使用者edit餐廳，修改資料庫資料
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
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
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// //routes setting
// app.get('/', (req, res) => {
//   res.render('index', { restaurant: restaurantList.results })
// })

//search button
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurant: restaurants, keyword: keyword })
})

//show detail page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(function (res) {
    return res.id === Number(req.params.restaurant_id)
  })
  res.render('show', { restaurant: restaurant[0] })
})

app.listen(port, () => {
  console.log(`listing on localhost:${port}`)
})