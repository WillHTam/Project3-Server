const Resource = require('../models/resources')
const User = require('../models/user')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var request = require('request-json')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var apiKey = 'e4f6f26d24b04759ae5b55ebe5e00394'
var url = 'http://www.bbc.com/future/story/20160719-meet-japans-kumamon-the-bear-who-earns-billions'
var instaparserData = {
  site_name: '',
  title: ''
}

function showAllResources (req, res, err) {
  Resource.find({}, function (err, resources) {
    res.status(200).json(resources)
  })
}

function seeMyResources (req, res) {
  const userEmail = req.get('email')
  const authToken = req.get('auth_token')
  // const userParams = new User(req.body)
  User.findOne({email: userEmail}, function (err, user) {
    if (err) return res.status(401).json({error: 'ERROR! ERROR!'})
    Resource.find({user}, function (err, resource) {
      if (err) return res.status(401).json({error: 'Error finding resource'})
      res.status(200).json(resource)
    })
  })
}

function makeNewResource (req, res) {
  var resource = new Resource(req.body)
  const userEmail = req.get('email')

  User.findOne({email: userEmail}, (err, user) => {
    if (err) return res.status(401).json({error: 'Unable to find user'})
    resource.user = user._id
    resource.save((err, resource) => {
      if (err) return res.status(401).json({error: 'error!'})
      res.status(201).json({message: 'Resource created', resource})
    })
  })
}

function updateResource (req, res) {
  Resource.findById(req.body.id, (err, resource) => {
    if (err) return res.status(401).json({error: 'Cannot find resource'})
    resource.title = req.body.title || ''
    resource.url = req.body.url
    resource.tags = req.body.tags
    resource.site_name = req.body.site_name
    resource.summary = req.body.summary
    resource.save((err) => {
      if (err) return res.status(401).json({error: err})
      res.status(200).json({message: 'Resource updated', resource})
    })
  })
}

function deleteResource (req, res, err) {
  // if (err) return res.status(401).json({error: 'Could not find resource'})
  const resourceid = req.body.id
  Resource.findById(resourceid).remove().exec()
  res.status(200).json({message: 'Resource deleted'})
}

var client = request.createClient('https://www.instaparser.com/')

function reqInstaparser (url) {
  client.get('api/1/article' + '?api_key=' + apiKey + '&url=' + url, function (err, res, body) {
  if (!err && res.statusCode == 200) {
      instaparserData.site_name = body.site_name
      instaparserData.title = body.title
    }
  })
}

module.exports = {
  showAllResources: showAllResources,
  seeMyResources: seeMyResources,
  makeNewResource: makeNewResource,
  updateResource: updateResource,
  deleteResource: deleteResource,
  reqInstaparser: reqInstaparser
}
