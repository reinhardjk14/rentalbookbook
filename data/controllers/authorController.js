"use strict"
const { Author } = require('../models');

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
}

module.exports = AuthorController