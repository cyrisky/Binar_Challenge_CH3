const express = require('express')
const router = express.Router()
const { UserGame, UserProfile, UserHistory } = require('./models')
const bcrypt = require('bcrypt')
const { pool } = require('./dbConfig')
const session = require('express-session')
const flash = require('express-flash')

router.use(express.json())

router.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

router.use(flash())

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

// !!!!==== LOGIN PAGE ====!!!!

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    let userUsername = UserGame.findOne(x => x.username === username)
    let userPassword = UserGame.findOne(x => x.password === password)

    if (userUsername && userPassword) {
        res.redirect('suit')
    } else if (userUsername && !userPassword) {
        res.json("Password Salah")
    } else {
        res.json("Email tidak ditemukan")
    }
})

// SIGN UP PAGE
router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const { username, password, password2 } = req.body

    console.log({
        username,
        password,
        password2
    });

    let errors = [];

    // Form Validation

    if (!username || !password || !password2) {
        errors.push({ message: "Please enter all fields" });
    }

    if (password != password2) {
        errors.push({ message: "Password do not match"});
    }

    if (errors.length > 0) {
        res.render('register', { errors })
    } else {
        // Form Validation Success

        let hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);

        pool.query(
            `SELECT * FROM "UserGames"
            WHERE username = $1`, [username], (err, results) => {
                if (err) {
                    throw err;
                }

                console.log(results.rows)

                if (results.rows.length > 0) {
                    errors.push({ message: "Username already exists"})
                    res.render('register', { errors })
                } else {
                    UserGame.create({
                        username: username,
                        password: hashedPassword,
                        role: "player",
                        access: true
                    })
                    .then(UserGame => {
                        res.redirect('/login')
                    })
                    .catch(err => {
                        res.status(422).json(err)
                    })
                }
            }
        )
    }
})

//GET All Articles
router.get('/api/database', (req,res) => {
    UserGame.findAll()
    .then(UserGame => {
        res.status(200).json(UserGame)
    })
})

//GET Articles by ID
router.get('/api/database/:id', (req,res) => {
    UserGame.findOne({
        where: { id: req.params.id }
    })
    .then(UserGame => {
        res.status(200).json(UserGame)
    })
})

//Edit data Article
router.put('/api/database/:id', (req,res) => {
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
})

//  Delete Articles
router.delete('/api/database/:id', (req,res) => {
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
})

//Biodata
router.get('/profile', (req, res) => {
    UserProfile.findAll()
    .then(articles => {
        res.status(200).json(articles)
    })
})

router.post('/profile', (req, res) => {
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
})

router.put('/profile/:id', (req,res) => {
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
})

// !!!!==== USER HISTORY ====!!!!
router.get('/profile/history', (req, res) => {
    UserHistory.findAll()
    .then(UserHistory => {
        res.status(200).json(UserHistory)
    })
})

router.post('/suit', (req, res) => {
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
})

module.exports = router