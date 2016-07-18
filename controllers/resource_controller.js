const Resource = require('../models/resources')
const User = require('../models/user')

users = [
  {first_name: 'Justin', last_name: 'Chan', email: 'juschanuk@gmail.com', password: 'accounting'},
  {first_name: 'William', last_name: 'Tam', email: 'william.tam@gmail.com', password: 'cat'}
]

resources = [
  { id: 1, title: 'Title 1', url: 'http://www.bbc.co.uk', tags: ['news', 'UK'] },
  { id: 2, title: 'Title 2', url: 'http://www.cnn.com', tags: ['news', 'USA'] },
  { id: 3, title: 'Title 3', url: 'http://www.todayonline.com', tags: ['news', 'Singapore'] },
  { id: 4, title: 'Title 4', url: 'http://www.dailymail.co.uk', tags: ['news', 'UK'] },
  { id: 5, title: 'Title 5', url: 'http://www.mrbrown.com', tags: ['satire', 'Singapore'] }
]

function seeMyResources (req, res) {
  // This is the only one I'm not sure about. I know we would have to use currentUser but I'm not sure how.
  User.findById(req.params.currentUser.user_id, function (err, user) {
    if (err) return res.status(401).json({error: 'ERROR! ERROR!'})
    res.status(200).json(user.resources)
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
  seeMyResources: seeMyResources,
  makeNewResource: makeNewResource,
  updateResource: updateResource,
  deleteResource: deleteResource
}
