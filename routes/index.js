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
router.post('/register', applicationController.userRegister)

/* EDIT user */
router.put('/user', applicationController.userLoggedIn, applicationController.editUser)

// User LOGIN
router.post('/login', applicationController.userLogIn)

// posts !!AND!! user DELETE
router.delete('/deleteUser', applicationController.userLoggedIn, applicationController.deleteUser)

// GET all resources
router.get('/allresources', resourceController.showAllResources)

// VIEW the logged in user's resources ONLY
router.get('/resources', applicationController.userLoggedIn, resourceController.seeMyResources)

// CREATE resource
router.post('/resources', applicationController.userLoggedIn, resourceController.makeNewResource)

// EDIT resource
router.put('/resources', applicationController.userLoggedIn, resourceController.updateResource)

// DELETE resource
router.delete('/resources', applicationController.userLoggedIn, resourceController.deleteResource)

module.exports = router
