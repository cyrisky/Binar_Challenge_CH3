const express = require('express')
const app = express()
const port = 8000
const bodyparser = require("body-parser")

app.set('view engine','ejs')

// middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
}
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(logger)
app.use('/assets', express.static('assets'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

const router = require('./router')
app.use(router)

app.use(function(err, req, res, next) {
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