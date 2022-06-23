const router = require('express').Router();
const Controller = require('../controllers/bookController');

router.get('/books', Controller.getAllBook)
// router.get('/books/:bookId', Controller.bookDetails)
router.get('/books/borrow/:bookId', Controller.borrowBook)
router.get('/books/return/:bookId', Controller.returnBook)

module.exports = router