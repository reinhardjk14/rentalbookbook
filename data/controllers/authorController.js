"use strict"
const { Author, Book } = require('../models');

class AuthorController {
  static getAllAuthor(req, res) {
    Author.findAll()
      .then(result => {
        res.render('listAuthor', { result })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static getBookPerAuthor(req, res) {
    let id = req.params.id
    Author.findByPk(id, {
      include: Book
    })
      .then(result => {
        res.render('listBookPerAuthor', { result })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addNewAuthorForm(req, res) {
    let errors = req.query.errors
    res.render('addNewAuthor', { errors })
  }

  static saveNewAuthor(req, res) {
    let { first_name, last_name, age } = req.body
    Author.create({first_name, last_name, age})
      .then(() => {
        res.redirect('/authors')
      })
      .catch(err => {
        if (err.name == 'SequelizeValidationError') {
          err.errors.map((el) => {
            return el.message
          })
        res.redirect(`/authors/add?errors=${err}`)
        }
      })
  }

  static formNewBook(req, res) {
    let errors = req.query.errors
    Author.findAll()
      .then(result => {
        res.render('addNewBook', { result, errors })    
      })
      .catch(err => {
        res.send(err)
      })
    
  }

  static saveNewBook(req, res) {
    let { title, AuthorId, genre, released_year } = req.body
    Book.create({title, AuthorId, genre, released_year})
      .then(() => {
        res.redirect(`/authors`)
      })
      .catch(err => {
        if (err.name == 'SequelizeValidationError') {
          err.errors.map((el) => {
            return el.message
          })
        res.redirect(`/authors/addBook?errors=${err}`)
        }
      })
  }

  static editBook(req, res) {
    let id = req.params.id
    let dataBook;
    Book.findByPk(id, {
      include: Author
    })
      .then(result => {
        dataBook = result
        return Author.findAll()
      })
      .then(dataAuthor => {
        res.render('editBook', { dataBook, dataAuthor })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static saveEditedBook(req, res){
    let id = req.params.id
    let { title, AuthorId, genre, released_year } = req.body
    Book.update({title, AuthorId, genre, released_year}, {
      where: {
        id
      }
    })
      .then(() => {
        res.redirect('/authors')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static deleteBook(req, res) {
    let id = req.params.id
    Book.destroy({
      where: {
        id
      }
    })
      .then(() => {
        res.redirect('/authors')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = AuthorController