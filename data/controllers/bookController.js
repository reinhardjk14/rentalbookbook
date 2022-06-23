"use strict"
const { Book, Author } = require('../models');

class BookController {
  static getAllBook(req, res) {
    Book.findAll({
      include: Author,
      order: [['released_year', 'DESC']]
    })
      .then(result => {
        res.render('listBook', { result })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editBook(req, res) {
    let id = req.params.id
    let dataBook;
    Book.findByPk(id, {
      include: Author
    })
      .then(result => {
        console.log(JSON.stringify(result, null, 2))
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

  static saveEditBook(req, res) {
    let id = req.params.id
    let { title, AuthorId, genre, released_year, status } = req.body
    Book.update({title, AuthorId, genre, released_year, status}, {
      where: {
        id: id
      }
    })
      .then(() => {
        res.redirect('/books')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addNewBookForm(req, res) {
    Author.findAll()
      .then(result => {
        res.render('addNewBook', { result })
      })
  }

  static saveNewBook(req, res) {
    let { title, AuthorId, genre, released_year} = req.body
    Book.create({title, AuthorId, genre, released_year})
      .then(() => {
        res.redirect('/books')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = BookController