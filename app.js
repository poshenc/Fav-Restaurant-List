const port = 3000
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes/index')
require('./config/mongoose')

const app = express()

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 使用 express.Router 獨立路由器
app.use(routes)

app.listen(port, () => { console.log(`listing on localhost:${port}`) })

