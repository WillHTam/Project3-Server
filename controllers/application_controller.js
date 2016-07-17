const User = require('../models/user')

function userLoggedIn(req, res, next) {
  const userEmail = req.get('User-email')
  const authToken = req.get('Auth-token')
  if (!userEmail || !authToken) return res.status(401).json({error: 'Unauthorised'})

  User.findOne({email: userEmail, auth_token: authToken}, (err, user) => {
    if(err || !user) return res.status(401).json({error: 'Unauthorised'})

    req.currentUser = user
    next()
  })
}

module.exports = {
  userLoggedIn: userLoggedIn
}
