const router = require('express').Router();
const Controller = require('../controllers/bookController');

router.get('/books', Controller.getAllBook)

module.exports = router