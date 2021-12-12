const { UserGame } = require('../models')
const passport = require('../lib/passport')

function format(user) {
    const { id, username } = user
    return {
        id,
        username,
        accessToken: user.generateToken()
    }
}

module.exports = {
    register: (req, res, next) => {
        // Kita panggil static method register yang sudah kita buat tadi
        UserGame.register(req.body)
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => next(err))
    },
    login: passport.authenticate('local', {
        successRedirect: '/whoami',
        failureRedirect: '/login',
        failureFlash: true
    }),
    apiLogin: (req, res) => {
        UserGame.authenticate(req.body)
            .then(user => {
                res.json(
                    format(user)
                )
            })
    },
    whoami: (req, res) => {
        res.render('suit', req.user.dataValues)
    },
    apiWhoami: (req, res) => {
        const currentUser = req.user
        res.json(currentUser)
    }
}