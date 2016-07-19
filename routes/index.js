var express = require('express')
var router = express.Router()
var applicationController = require('../controllers/application_controller')
var resourceController = require('../controllers/resource_controller')
var User = require('../models/user')
var Resource = require('../models/resources')
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/* GET home */
router.get('/', function (req, res, next) {
  res.status(200)
  res.render('../views/index.ejs')
})

/* POST new user */
router.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) return res.status(401).json({error: 'ERROR! Could not create user.'})
    res.status(201).json({message: 'User created.'}) // ,  auth_token: user.auth_token})
  })
})

// User LOGIN
router.post('/login', (req, res) => {
  const userParams = new User(req.body)
  User.findOne({email: userParams.email}, (err, user) => {
    if (err || !user) return res.status(405).json({error: 'Cannot find user'})

    console.log(user)

    user.authenticate(userParams.password, (err, isMatch) => {
      // console.log('Error: ' + err)
      // console.log('isMatch: ' + isMatch)
      if (err || !isMatch) return res.status(401).json({error: 'Password no match'})

      res.status(200).json({message: 'User logged in', auth_token: user.auth_token})
    })
  })
})

// posts !!AND!! user DELETE
router.delete('/deleteUser', (req, res) => {
  console.log("In delete User")
  const userEmail = req.body.user.email
  console.log("Delete User, UserParams: " + userEmail)
  User.findOne({email: userEmail}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'Email or password is invalid'})

    // user.authenticate(userParams.password, (err, isMatch) => {
    // if (err || !isMatch) return res.status(401).json({error: 'Email or password is invalid'})
      Resource.find({user}, (err, resource) => {
        if (err || !user) return res.status(401).json({error: 'Error finding resource AND/OR user'})
        console.log(resource)
        console.log(user)
        resource.remove()
        user.remove()
        res.status(200).json({message: 'User and Resources deleted'})
      })
    })
 // })
})

// INIT - to be run every time mocha is return

// LOGOUT

// ADDITIONS!!!!!!!!!

router.get('/allresources', resourceController.showAllResources)

// VIEW MY resources
// router.get('/resources', applicationController.userLoggedIn, resourceController.seeMyResources)
router.get('/resources', resourceController.seeMyResources)

// CREATE resource
// router.post('/resources', applicationController.userLoggedIn, resourceController.makeNewResource)
router.post('/resources', resourceController.makeNewResource)

// EDIT resource
// router.route('resources/:id').put(applicationController.userLoggedIn, resourceController.updateResource)
router.route('resources/:id').put(resourceController.updateResource)

// DELETE resource
// router.delete(applicationController.userLoggedIn, resourceController.deleteResource)
// router.delete(resourceController.deleteResource)

// END OF ADDITIONS

router.get('/secret', applicationController.userLoggedIn, (req, res) => {
  res.status(200).json({secret: 'hello ' + req.currentUser.email})
})

module.exports = router
