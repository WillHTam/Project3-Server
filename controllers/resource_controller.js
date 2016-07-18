const Resource = require('../models/resources')
const User = require('../models/user')

users = [
  {id: 1, first_name: 'Justin', last_name: 'Chan', email: 'juschanuk@gmail.com', password: 'accounting'},
  {id: 2, first_name: 'William', last_name: 'Tam', email: 'william.tam@gmail.com', password: 'cat'}
]

resources = [
  { id: 1, title: 'Title 1', url: 'http://www.bbc.co.uk', tags: ['news', 'UK'], user: 1 },
  { id: 2, title: 'Title 2', url: 'http://www.cnn.com', tags: ['news', 'USA'], user: 2 },
  { id: 3, title: 'Title 3', url: 'http://www.todayonline.com', tags: ['news', 'Singapore'], user: 1 },
  { id: 4, title: 'Title 4', url: 'http://www.dailymail.co.uk', tags: ['news', 'UK'], user: 2 },
  { id: 5, title: 'Title 5', url: 'http://www.mrbrown.com', tags: ['satire', 'Singapore'], user: 1 }
]

function showAllResources (req, res, err) {
  // TODO: error if statement creates issue
  // if (err) return res.status(401).json({error: 'Error'})
  res.status(200).json(resources)
}

function seeMyResources (req, res) {
  // This is the only one I'm not sure about. I know we would have to use currentUser but I'm not sure how.
  User.findById(req.params.currentUser.user_id, function (err, user) {
    if (err) return res.status(401).json({error: 'ERROR! ERROR!'})
    // TODO: filter based on user id
    res.status(200).json(resources)
  })
}

function makeNewResource (req, res) {
  const user = req.currentUser
  const resource = new Resource(req.body)
  user.resources.push(resource)

  user.save((err, resource) => {
    if (err) return res.status(401).json({error: 'error!'})
    res.status(200).json({message: 'Resource created', resource})
  })
}

function updateResource (req, res) {
  const resourceId = req.params.id
  var resource = req.currentUser.resources.id(resourceId)
  resource.id = req.body.id
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
  var resource = req.currentUser.resources.id(resourceId)
  req.currentUser.resources.pull(resource)
  req.currentUser.save((err) => {
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
