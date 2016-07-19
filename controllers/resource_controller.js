const Resource = require('../models/resources')
const User = require('../models/user')

users = [
  {first_name: 'Justin', last_name: 'Chan', email: 'juschanuk@gmail.com', password: 'accounting'},
  {first_name: 'William', last_name: 'Tam', email: 'william.tam@gmail.com', password: 'cat'}
]

resources = [
  { id: 1, title: 'Title 1', url: 'http://www.bbc.co.uk', tags: ['news', 'UK'], user: users[0].id },
  { id: 2, title: 'Title 2', url: 'http://www.cnn.com', tags: ['news', 'USA'], user: users[1].id },
  { id: 3, title: 'Title 3', url: 'http://www.todayonline.com', tags: ['news', 'Singapore'], user: users[0].id },
  { id: 4, title: 'Title 4', url: 'http://www.dailymail.co.uk', tags: ['news', 'UK'], user: users[1].id },
  { id: 5, title: 'Title 5', url: 'http://www.mrbrown.com', tags: ['satire', 'Singapore'], user: users[0].id }
]

function showAllResources (req, res, err) {
  Resource.find({}, function (err, resources) {
    res.status(200).json(resources)
  })
}

function seeMyResources (req, res) {
  // TODO: this.
  const userParams = new User(req.body)
  User.findOne({email: userParams.email}, function (err, user) {
    if (err) return res.status(401).json({error: 'ERROR! ERROR!'})
    Resource.find({user}, function(err, resource) {
      if (err) return res.status(401).json({error: 'Error finding resource'})
      res.status(200).json(resource)
    })
  })
}

function makeNewResource (req, res) {
  var resource = new Resource(req.body)
  const userEmail = req.get('User-email')

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
  const resourceId = req.params.id
  var resource = req.resources.id(resourceId)
  req.resource.pull(resource)
  req.resource.save((err) => {
    if (err) return res.status(401).json({error: err})
    res.status(200).json({message: 'Resource deleted'})
  })
}

module.exports = {
  showAllResources: showAllResources,
  seeMyResources: seeMyResources,
  makeNewResource: makeNewResource,
  updateResource: updateResource,
  deleteResource: deleteResource
}
