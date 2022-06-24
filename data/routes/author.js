const router = require('express').Router();
const Controller = require('../controllers/authorController');


// MIDDLEWARE UNTUK HANDLE APAKAH ROLE ADMIN ATAU BUKAN
// router.use((req, res, next) => {
//   if (req.session.UserId && req.session.role != 'admin') {
//     const error = 'Access prohibited'
//     res.redirect(`/login?error=${error}`)
//   } else {
//     next()
//   }
// })
router.get('/authors', Controller.getAllAuthor)
router.get('/authors/addBook', Controller.formNewBook)
router.post('/authors/addBook', Controller.saveNewBook)
router.get('/authors/add', Controller.addNewAuthorForm)
router.post('/authors/add', Controller.saveNewAuthor)
router.get('/authors/:id', Controller.getBookPerAuthor)

router.get('/authors/:id/edit', Controller.editBook)
router.post('/authors/:id/edit', Controller.saveEditedBook)
router.get('/authors/:id/delete', Controller.deleteBook)

module.exports = router