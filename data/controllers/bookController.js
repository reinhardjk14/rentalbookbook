"use strict"
const { Book, Author, User, Profile } = require('../models');
const { Op } = require('sequelize');
const transporter = require('../helper/nodemailer');
  
class BookController {
  static showAllBooks(req, res) {
    let search = req.query.search
    Book.showAllBooks(Author, search)
      .then(result => {
        res.render('showBookForUser', { result })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static borrowBook(req, res) {
    const id = req.params.bookId

    Book.update({ status: 'not available' }, {
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

    Book.update({ status: 'available' }, {
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

  static returnBookForUser(req, res) {
    const id = req.params.bookId

    Book.update({ status: 'Availble' }, {
      where: {
        id: +id
      }
    })
    .then(books => {
      res.redirect('/books/user')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static usersBook(req, res) {
    let errors = req.query.errors
    Book.findAll({
      where: {
        status: {
          [Op.eq]: 'not available'
        }
      },
      include: Author
    })
    .then(books => {
      res.render('userBooks', { books, transporter, errors })
    })
    .catch(err => {
      res.send(err)
    })
  }
  
  static sendEmail(req, res) {
    let email = req.body.email
    let name = req.body.name
    Profile.create({name, email})
      .then(() => {  
        let options = {
          from: 'inadinad88@yahoo.com',
          to: email,
          subject: 'Borrowing Book Confirmation',
          html: `<h1>RENTALBOOKBOOK</h1> <p>Hi <strong>${name}</strong>, thank you for renting at us. This is the confirmation letter of your booking, and please make the payment before 24 hours. After you make your payment, please send the receipt by Whatsapp to +62818898950. If we do not receive any payment, your booking will be cancelled. Thank you and have a nice day.</p>`
        }
        transporter.sendMail(options, function(err, info) {
          if(err) {
            console.log(err)
            return
          }
          console.log(info.response)
        })
        res.redirect('/books')
      })
      .catch(err => {
        if (err.name == 'SequelizeValidationError') {
          err.errors.map((el) => {
            return el.message
          })
          res.redirect(`/books/user?errors=${err}`)
        }
      })
  }
}

module.exports = BookController