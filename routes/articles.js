const router = require('express').Router()
const article = require('../controllers/articleController')

//Database
router.get('/api/database', article.dbFindAll)
router.get('/api/database/:id', article.dbFindOne)
router.put('/api/database/:id', article.dbUpdate)
router.delete('/api/database/:id', article.dbDestroy)

//Biodata
router.get('/profile', article.profileFindAll)
router.post('/profile', article.profileCreate)
router.put('/profile/:id', article.profileUpdate)

// !!!!==== USER HISTORY ====!!!!
router.get('/profile/history', article.historyFindAll)
router.post('/suit', article.historyCreate)

module.exports = router