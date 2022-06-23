"use strict"
const { Author, Book } = require('../models');

class AuthorController {
  static getAllAuthor(req, res) {
    Author.findAll()
      .then(result => {
        res.render('listAuthor', { result })
        // res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static authorBook(req, res) {
    const id = req.params.authorId

    Author.findByPk(+id, {
      include: Book
    }) 
    .then(authors => {
      res.render('authorsBook', { authors })
      // res.send(authors)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = AuthorController