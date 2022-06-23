"use strict"
const { Author, Book } = require('../models');
const { Op } = require('sequelize')

class AuthorController {
  static getAllAuthor(req, res) {
    const { search } = req.query

    const options = {}

    if (search) {
      options.where = {
        [Op.or]: [
          {first_name: {
            [Op.iLike]: `%${search}%`
          }},
          {last_name: {
            [Op.iLike]: `%${search}%`
          }}
        ]
      }
    }

    Author.findAll(options)
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