
const todoController = require('../controllers/todoController.js')
const userController = require('../controllers/userController.js')

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }
  //如果使用者訪問首頁，就導向 /todos 的頁面
  app.get('/', authenticated, (req, res) => res.redirect('/todos'))

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)
  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)


  //在 /todos 底下則交給 restController.gettodos 來處理
  app.get('/todos', authenticated, todoController.getTodos)
  app.get('/todos/create', authenticated, todoController.createTodo)
  app.post('/todos', authenticated, todoController.postTodo)
  app.get('/todos/:id/edit', authenticated, todoController.editTodo)
  app.put('/todos/:id', authenticated, todoController.putTodo)
  app.delete('/todos/:id', authenticated, todoController.deleteTodo)

}