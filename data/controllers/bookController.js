"use strict"
const { Book, Author } = require('../models');

class BookController {
  static getAllBook(req, res) {
    Book.findAll({
      include: Author,
      order: [['status', 'DESC']]
    })
      .then(result => {
        res.render('listBook', { result })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static borrowBook(req, res) {
    const id = req.params.bookId

    Book.update({ status: 'Borrowed!' }, {
      where: {
        id: +id
      }
    })
    .then(books => {
      res.redirect('/books')
    })
    .catch(err => {
      res.send(err)
    })

  }

  static returnBook(req, res) {
    const id = req.params.bookId

    Book.update({ status: 'Availble' }, {
      where: {
        id: +id
      }
    })
    .then(books => {
      res.redirect('/books')
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = BookController