var express = require('express')
var router = express.Router()

/* GET home */
router.get('/', function (req, res, next) {
  res.status(200)
  res.render('../views/index.ejs')
})
module.exports = router
