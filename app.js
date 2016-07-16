const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const logger = require('morgan');
// const appController = require('./controllers/application_controller');
const port = process.env.PORT || 3000;

var routes = require('./routes/index');
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token');
  next();
});

app.use('/', routes);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//test
