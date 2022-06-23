const router = require('express').Router();
const Controller = require('../controllers');
const authors = require('./author');
const books = require('./book');

router.get('/', Controller.landingPage)
router.get('/register', Controller.registerPage)
router.post('/register', Controller.saveNewUser)
router.get('/login', Controller.loginPage)
router.post('/login', Controller.postLogin)

router.use((req, res, next) => {
  // console.log(req.session)
  if (!req.session.UserId) {
    const error = 'Login dulu yaw'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})

router.use((req, res, next) => {
  if (req.session.role == 'admin') {
    router.use(authors)
    next()

  } else if (req.session.role != 'admin'){
    router.use(books)
    next()

  }
})



// MIDDLEWARE UNTUK HANDLE LOGIN DULU SEBELUM BISA AKSES MACEM"
// router.use((req, res, next) => {
//   // console.log(req.session)
//   if (!req.session.UserId) {
//     const error = 'Login dulu yaw'
//     res.redirect(`/login?error=${error}`)
//   } else {
//     next()
//   }
// })

// // MIDDLEWARE UNTUK HANDLE APAKAH ROLE ADMIN ATAU BUKAN
// router.use((req, res, next) => {
//   if (req.session.UserId && req.session.role != 'admin') {
//     const error = 'Access prohibited'
//     res.redirect(`/login?error=${error}`)
//   } else {
//     next()
//   }
// })


router.get('/logout', Controller.getLogout)
module.exports = router

