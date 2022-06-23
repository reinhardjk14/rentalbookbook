"use strict"
const { Author, Book } = require('../models');

class AuthorController {
  static getAllAuthor(req, res) {
    Author.findAll()
      .then(result => {
        // console.log(result)
        res.render('listAuthor', { result })
        // res.send(result)
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
        console.log(result)
        res.render('listBookPerAuthor', { result })
        // res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addNewAuthorForm(req, res) {
    res.render('addNewAuthor')
  }

  static saveNewAuthor(req, res) {
    let { first_name, last_name, age } = req.body
    Author.create({first_name, last_name, age})
      .then(() => {
        res.redirect('/authors')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = AuthorController