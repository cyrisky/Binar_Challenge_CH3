const express = require('express')
const router = express.Router()
let user = require('./auth.json')

router.use((req, res, next) => {
    console.log('Time: ', new Date(Date.now()));
    next()
})

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/suit', (req, res) => {
    res.render('suit')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    let userEmail = user.find(x => x.email === email)
    let userPassword = user.find(x => x.password === password)
    if (userEmail && userPassword) {
        res.json(userEmail)
    } else if (userEmail && !userPassword) {
        res.json("Password Salah")
    } else {
        res.json("Email tidak ditemukan")
    }
})

module.exports = router