module.exports = {
    home: (req, res) => {
        res.render('index')
    },
    login: (req, res) => {
        res.render('login')
    },
    register: (req, res) => {
        res.render('register')
    },
    suit: (req, res) => {
        res.render('suit')
    },
}