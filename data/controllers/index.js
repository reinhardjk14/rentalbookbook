"use strict"

const { User, UserBook, Book } = require('../models');
const bcrypt = require('bcryptjs');

class Controller {
  static landingPage(req, res) {
    res.render('landingPage') 
  }

  static registerPage(req, res) {
    res.render('register-form')
  }

  static saveNewUser(req, res) {
    let { email, password, role } = req.body
    User.create({email, password, role})
      .then(result => {
        res.redirect('/login')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static loginPage(req, res) {
    let errors = req.query.error
    res.render('login-form', { errors })
  }

  static postLogin(req, res) {
    const error = 'Invalid Email/Password'
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
            res.redirect('/authors')
          } else {
            res.redirect(`/login?error=${error}`)
          }
        } else {
          res.redirect(`/login?error=${error}`)
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