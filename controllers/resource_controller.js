const Resource = require('../models/resources')
const User = require('../models/user')

function showAllResources (req, res, err) {
  Resource.find({}, function (err, resources) {
    res.status(200).json(resources)
  })
}

function seeMyResources (req, res) {
  // TODO: this.
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
  const resourceId = req.params.id
  var resource = req.resources.id(resourceId)
  resource.title = req.body.title
  resource.url = req.body.url
  resource.tags = req.body.tags
  req.currentUser.save((err) => {
    if (err) return res.status(401).json({error: err})
    res.status(200).json({message: 'Resource updated', resource})
  })
}

function deleteResource (req, res) {
  const resourceid = req.body.id
  Resource.findById(resourceid).remove().exec()
  res.status(200).json({message: 'Resource deleted'})
}

module.exports = {
  showAllResources: showAllResources,
  seeMyResources: seeMyResources,
  makeNewResource: makeNewResource,
  updateResource: updateResource,
  deleteResource: deleteResource
}
