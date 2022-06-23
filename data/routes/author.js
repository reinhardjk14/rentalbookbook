const router = require('express').Router();
const Controller = require('../controllers/authorController');

router.get('/authors', Controller.getAllAuthor)
router.get('/authors/add', Controller.addNewAuthorForm)
router.post('/authors/add', Controller.saveNewAuthor)
router.get('/authors/:id', Controller.getBookPerAuthor)


module.exports = router