"use strict"
const { Book, Author } = require('../models');
const { Op, where } = require('sequelize')

class BookController {
  static getAllBook(req, res) {
    const { search } = req.query

    const options = {
      include: Author,
      order: [['status', 'DESC']]
    }

    if(search) {
      options.where = {
        title: {
          [Op.iLike]: `%${search}%`
        }
      }
    }

    Book.findAll(options)
      .then(result => {
        res.render('listBook', { result })
        // res.send(result)
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

  static usersBook(req, res) {
    const { search } = req.query
    
    const options = {
      where: {
        status: {
          [Op.eq]: 'Borrowed!'
        }
      },
      include: Author
    }

    if (search) {
      options.where.title = {
        [Op.iLike]: `%${search}%`
      }
    }

    Book.findAll(options)
    .then(books => {
      res.render('userBooks', { books })
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = BookController