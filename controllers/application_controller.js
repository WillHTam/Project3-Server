const User = require('../models/user')

function userLoggedIn (req, res, next) {
  const userEmail = req.get('email')
  const authToken = req.get('auth_token')
  if (!userEmail || !authToken) return res.status(401).json({error: 'Unauthorised'})

  User.findOne({email: userEmail, auth_token: authToken}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'Unauthorised'})

    req.currentUser = user
    next()
  })
}

function userFind (req, res, next) {
  User.findOne({first_name: 'Justin'}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'Cannot find user'})
  })
}

function editUser(req, res, next) {
  console.log('I AM ACTIVATED')
  console.log('editUser start: ' + req.body.user1)
  User.findOne({auth_token: req.get('auth_token')}, (err , user) => {
    if (err) res.status(401).json({error: 'Cannot find user'})
    else {
      user.first_name = req.body.first_name
      user.last_name = req.body.last_name
      user.email = req.body.email
      user.password = req.body.password
      user.save( function(err) {
        if (err) res.status(400).json({error: 'cannot save user'})
        res.status(200).json({message: 'User successfully updated', auth_token: user.auth_token, email: user.email})
        next()
      })
    }
  })
}

module.exports = {
  userFind: userFind,
  userLoggedIn: userLoggedIn,
  editUser: editUser
}
