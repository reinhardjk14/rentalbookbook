const router = require('express').Router();
const Controller = require('../controllers');
const authors = require('./author');
const books = require('./book');

router.get('/', Controller.landingPage)
router.use(authors)
router.use(books)

module.exports = router

