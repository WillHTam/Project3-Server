var express = require('express')
var router = express.Router()
var applicationController = require('../controllers/application_controller')
var User = require('../models/user')
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* GET home */
router.get('/', function (req, res, next) {
  res.status(200)
  res.render('../views/index.ejs')
})

/* POST new user */
router.post('/signup', (req, res) => {
  const user = new User(req.body.user)
  console.log(req.body.user)
  user.save((err, user) => {
    if (err) return res.status(401).json({error: err.message})
    res.status(201).json({message: 'User created.', auth_token: user.auth_token})
  })
})

router.post('/login', (req, res) => {
  const userParams = req.body.user
  User.findOne({email: userParams.email}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'Email or password is invalid'})

    user.authenticate(userParams.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({error: 'Email or password is invalid'})

      res.status(201).json({message: 'User logged in', auth_token: user.auth_token})
    })
  })
})

router.get('/secret', applicationController.userLoggedIn, (req, res) => {
  res.status(200).json({secret: 'hello ' + req.currentUser.email})
})

module.exports = router
