const router = require('express').Router();
const Controller = require('../controllers/authorController');

router.get('/authors', Controller.getAllAuthor)

module.exports = router