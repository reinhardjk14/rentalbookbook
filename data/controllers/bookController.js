"use strict"
const { Book, Author } = require('../models');

class BookController {
  static getAllBook(req, res) {
    Book.findAll({
      include: Author,
      order: [['status', 'DESC']]
    })
      .then(result => {
        // console.log(JSON.stringify(result, null, 2))
        res.render('listBook', { result })
        // res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = BookController