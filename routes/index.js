const router = require('express').Router()
const user = require('./user')
const page = require('./page')
const article = require('./articles')

router.use(user)
router.use(page)
router.use(article)
module.exports = router