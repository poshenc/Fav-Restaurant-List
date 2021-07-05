const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

//search button
app.get('/search', (req, res) => {
  // const restaurants = restaurantList.results.filter((restaurants) => {
  //   return restaurants.name.toLowerCase().includes(req.query.keyword.toLowerCase() ）|| restaurants.category.toLowerCase().includes(req.query.keyword.toLowerCase()))
  // })
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