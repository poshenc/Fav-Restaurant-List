const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
const port = 3000
const Restaurant = require('./models/restaurant.js')
const bodyParser = require('body-parser')

const methodOverride = require('method-override')
const routes = require('./routes/index')

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

app.use(methodOverride('_method'))

// 使用 express.Router 獨立路由器
app.use(routes)

//search function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      restaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurants: restaurants, keyword: keyword })
    })
})

app.listen(port, () => {
  console.log(`listing on localhost:${port}`)
})



// (舊code，可刪)

// //routes setting (舊code，可刪)
// app.get('/', (req, res) => {
//   res.render('index', { restaurant: restaurantList.results })
// })

// //search button (舊code，可刪)
// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
//   res.render('index', { restaurants: restaurants, keyword: keyword })
// })

// //show detail page (舊code，可刪)
// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.filter(function (res) {
//     return res.id === Number(req.params.restaurant_id)
//   })
//   res.render('show', { restaurant: restaurant[0] })
// })
