const router = require('express').Router();
const Controller = require('../controllers/bookController');



// MIDDLEWARE UNTUK HANDLE APAKAH ROLE ADMIN ATAU BUKAN
// router.use((req, res, next) => {
//   if (req.session.UserId && req.session.role == 'admin') {
//     const error = 'Access prohibited'
//     res.redirect(`/login?error=${error}`)
//   } else {
//     next()
//   }
// })

router.get('/books/', Controller.showAllBooks )
router.get('/books/borrow/:bookId', Controller.borrowBook)
router.get('/books/return/:bookId', Controller.returnBook)
router.get('/books/return-for-user/:bookId', Controller.returnBookForUser)
router.get('/books/user', Controller.usersBook)
router.post('/books/user' , Controller.sendEmail)

module.exports = router