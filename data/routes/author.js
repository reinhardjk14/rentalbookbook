const router = require('express').Router();
const Controller = require('../controllers/authorController');

router.get('/authors', Controller.getAllAuthor)
router.get('/authors/:authorId', Controller.authorBook)

module.exports = router