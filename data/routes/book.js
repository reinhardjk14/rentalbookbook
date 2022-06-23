const router = require('express').Router();
const Controller = require('../controllers/bookController');

router.get('/books', Controller.getAllBook)
router.get('/books/edit/:id', Controller.editBook)
router.post('/books/edit/:id', Controller.saveEditBook)
router.get('/books/add', Controller.addNewBookForm)
router.post('/books/add', Controller.saveNewBook)
module.exports = router