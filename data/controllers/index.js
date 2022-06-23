"use strict"

const { User, UserBook, Book } = require('../models');
const bcrypt = require('bcryptjs');

class Controller {
  static landingPage(req, res) {
    res.render('landingPage') 
  }

  static registerPage(req, res) {
    let errors = req.query.errors
    res.render('register-form', { errors })
  }

  static saveNewUser(req, res) {
    let { email, password, role } = req.body
    User.create({email, password, role})
      .then(result => {
        res.redirect('/login')
      })
      .catch(err => {
        if (err.name == 'SequelizeValidationError') {
          err.errors.map((el) => {
            return el.message
          })
          // res.send(err)
          res.redirect(`/register?errors=${err}`)
        }
        
      })
  }

  static loginPage(req, res) {
    let errors = req.query.errors
    res.render('login-form', { errors })
  }

  static postLogin(req, res) {
    const errors = 'Invalid Email/Password'
    let { email, password } = req.body  
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if (user) {
          const isPasswordValid = bcrypt.compareSync(password, user.password)
          if (isPasswordValid) {
            //set session di ctrler login
            req.session.UserId =  user.id
            req.session.role = user.role
            if (req.session.role == 'admin') {
              res.redirect('/authors')
            } else {
              res.redirect('/books')
            }
            
          } else {
            res.redirect(`/login?errors=${errors}`)
          }
        } else {
          res.redirect(`/login?errors=${errors}`)
        }
      })
      .catch(err => {
        res.send(err)      
      })
  }

  static getLogout(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err)
      else {
        res.redirect('/login')
      }
    })  
  }
}

module.exports = Controller