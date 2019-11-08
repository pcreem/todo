const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models') // 引入資料庫
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
// setup session and flash
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())

// setup passport
app.use(passport.initialize())
app.use(passport.session())

// 把 req.flash 放到 res.locals 裡面
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app, passport)