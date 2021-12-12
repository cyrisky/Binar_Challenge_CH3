const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')
const { port = 8000 } = process.env


app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'challengecris',
    resave: false,
    saveUninitialized: false
}))

const passport = require('./lib/passportJwt')
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.set('view engine', 'ejs')

// middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}
app.use(express.json())
app.use(logger)
app.use('/assets', express.static('assets'))

const router = require('./routes')
app.use(router)

app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).json({
        status: 'fail',
        errors: err.message
    })
})

app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        errors: 'Page not found'
    })
    next()
})

//webServer
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))