const { UserGame, UserProfile, UserHistory } = require('../models')

module.exports = {
    dbFindAll: (req,res) => {
        UserGame.findAll()
        .then(UserGame => {
            res.status(200).json(UserGame)
        })
    },
    dbFindOne: (req,res) => {
        UserGame.findOne({
            where: { id: req.params.id }
        })
        .then(UserGame => {
            res.status(200).json(UserGame)
        })
    },
    dbUpdate: (req,res) => {
        UserGame.update({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            access: req.body.access
        }, {
            where: { id: req.params.id }
        })
        .then(UserGame => {
            res.status(201).json(UserGame)
        })
        .catch(err => {
            res.status(422).json("Can't create article")
        })
    },
    dbDestroy: (req,res) => {
        UserGame.destroy({
            where: { id: req.params.id }
        })
        .then(res => {
            if(res != 0){ res.status(201).json(res)
            } else{res.status(422).json('Gabisa hapus article')}
        })
        .catch(err => {
            res.status(404).json('tidak ditemukan')
        })
    },
    profileFindAll: (req, res) => {
        UserProfile.findAll()
        .then(articles => {
            res.status(200).json(articles)
        })
    },
    profileCreate: (req, res) => {
        UserProfile.create({
            id: req.body.id,
            name: req.body.name,
            gender: req.body.gender,
            // phoneNumber: req.body.phoneNumber
        })
        .then(UserProfile => {
            res.status(201).json(UserProfile)   
        })
        .catch(err => {
            res.status(422).json(err)
        })
    },
    profileUpdate: (req,res) => {
        UserProfile.update({
            id: req.body.id,
            name: req.body.name,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber
        }, {
            where: { id: req.params.id }
        })
        .then(UserProfile => {
            res.status(201).json(UserProfile)
        })
        .catch(err => {
            res.status(422).json("Can't create article")
        })
    },
    historyFindAll: (req, res) => {
        UserHistory.findAll()
        .then(UserHistory => {
            res.status(200).json(UserHistory)
        })
    },
    historyCreate: (req, res) => {
        UserHistory.create({
            playerChoice: req.body.playerChoice,
            computerChoice: req.body.computerChoice,
            result: req.body.result
        })
        .then(UserHistory => {
            res.status(201).json(UserHistory)   
        })
        .catch(err => {
            res.status(422).json(err)
        })
    }
}