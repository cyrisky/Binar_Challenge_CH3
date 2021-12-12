const router = require('express').Router()
const restrict = require('../controllers/restrict')
const restrictJwt = require('../controllers/restrictJwt')
const page = require('../controllers/pageController')
const auth = require('../controllers/authController')

router.get('/', page.home)
router.get('/login', page.login)
router.get('/register' , page.register)
router.get('/suit' , restrict, page.suit)
router.get('/whoami', restrict, auth.whoami)
router.get('/apiwhoami', restrictJwt, auth.apiWhoami)
module.exports = router