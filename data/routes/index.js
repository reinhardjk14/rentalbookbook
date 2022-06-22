const router = require('express').Router();
const Controller = require('../controllers');

router.get('/', Controller.landingPage)
module.exports = router

