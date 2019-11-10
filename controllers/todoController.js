const db = require('../models')
const List = db.List

const todoController = {
  getTodos: (req, res) => {
    res.locals.user = req.user
    return List.findAll().then(lists => {
      return res.render('todos', { lists: lists, user: res.locals.user })
    })
  },

  createTodo: (req, res) => {
    return List.findAll().then(lists => {
      return res.render('create', { lists: lists })
    })
  },

  postTodo: (req, res) => {
    res.locals.user = req.user
    if (!req.body.item) {
      req.flash('error_messages', "item didn't exist")
      return res.redirect('back')
    }
    return List.create({
      status: req.body.status,
      item: req.body.item,
      deadline: req.body.deadline,
      category: req.body.category,
      UserId: res.locals.user.id
    })
      .then((todo) => {
        req.flash('success_messages', 'todo was successfully created')
        res.redirect('/todos')
      })
  },

  editTodo: (req, res) => {
    return List.findByPk(req.params.id).then(todo => {
      return res.render('create', { todo: todo })
    })
  },

  putTodo: (req, res) => {
    if (!req.body.item) {
      req.flash('error_messages', "item didn't exist")
      return res.redirect('back')
    }

    return List.findByPk(req.params.id)
      .then((todo) => {
        todo.update({
          status: req.body.status,
          item: req.body.item,
          deadline: req.body.deadline,
          category: req.body.category,
        })
          .then((todo) => {
            req.flash('success_messages', 'todo was successfully to update')
            res.redirect('/')
          })
      })
  },

  deleteTodo: (req, res) => {
    return List.findByPk(req.params.id)
      .then((todo) => {
        todo.destroy()
          .then((todo) => {
            res.redirect('/')
          })
      })
  },

  getTodo: (req, res) => {
    return List.findByPk(req.params.id).then(todo => {
      return res.render('todo', {
        todo: todo
      })
    })
  }


}
module.exports = todoController