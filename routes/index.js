
const todoController = require('../controllers/todoController.js')
const userController = require('../controllers/userController.js')

module.exports = (app, passport) => {

  //如果使用者訪問首頁，就導向 /todos 的頁面
  app.get('/', (req, res) => res.redirect('/todos'))

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)

  //在 /todos 底下則交給 restController.gettodos 來處理
  app.get('/todos', todoController.getTodos)
}