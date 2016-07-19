const User = require('../models/user')

function userLoggedIn (req, res, next) {
  const userEmail = req.get('user_email')
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

module.exports = {
  userFind: userFind,
  userLoggedIn: userLoggedIn
}
