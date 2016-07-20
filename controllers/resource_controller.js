const Resource = require('../models/resources')
const User = require('../models/user')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var request = require('request-json')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var apiKey = 'e4f6f26d24b04759ae5b55ebe5e00394'

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
    if (err || !user) return res.status(401).json({error: 'Unable to find user'})

    reqInstaparser(req.body.url, function (site_name, title, description, thumbnail) {
      resource.site_name = site_name
      resource.title = title
      resource.description = description
      resource.thumbnail = thumbnail
      resource.user = user._id

      resource.save((err, resource) => {
        if (err) return res.status(401).json({error: 'error!'})
        res.status(201).json({message: 'Resource created', resource})
      })
    })
  })
}

var client = request.createClient('https://www.instaparser.com/')

function reqInstaparser (url, cb) {
  client.get('api/1/article' + '?api_key=' + apiKey + '&url=' + url, function (err, res, body) {
  if (!err && res.statusCode == 200) {
      cb(body.site_name, body.title, body.description, body.thumbnail)
    }
  })
}

function updateResource (req, res) {
  Resource.findById(req.body.id, (err, resource) => {
    if (err) return res.status(401).json({error: 'Cannot find resource'})
    resource.title = req.body.title
    resource.url = req.body.url
    resource.tags = req.body.tags
    resource.site_name = req.body.site_name
    resource.summary = req.body.summary
    resource.thumbnail = req.body.thumbnail
    resource.save((err) => {
      if (err) return res.status(401).json({error: err})
      res.status(200).json({message: 'Resource updated', resource})
    })
  })
}

function deleteResource (req, res, err) {
  const resourceid = req.get('id')
  const userEmail = req.get('email')
  const authToken = req.get('auth_token')

  User.findOne({email: userEmail, auth_token: authToken}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'User not found (deleteResource)'})
    else {
      Resource.findById(resourceid, (err, resource) => {
        if (err) return res.status(401).json({error: "Resource not found"})
        else {
          resource.remove()
          res.status(200).json({message: 'Resource deleted'})
        }
      })
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
