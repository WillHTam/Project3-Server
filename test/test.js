/* globals describe it before */
var util = require('util')
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const app = require('../app')
const User = require('../models/user')
const Resources = require('../models/resources')
const appController = require('../controllers/application_controller')

users = [
  {first_name: 'Justin', last_name: 'Chan', email: 'juschanuk@gmail.com', password: 'accounting'},
  {first_name: 'William', last_name: 'Tam', email: 'william.tam@gmail.com', password: 'cat'}
]

resources = [
  {title: 'Title 1', url: 'http://www.bbc.co.uk', tags: ['news', 'UK']},
  {title: 'Title 2', url: 'http://www.cnn.com', tags: ['news', 'USA']},
  {title: 'Title 3', url: 'http://www.todayonline.com', tags: ['news', 'Singapore']},
  {title: 'Title 4', url: 'http://www.dailymail.co.uk', tags: ['news', 'UK']},
  {title: 'Title 5', url: 'http://www.mrbrown.com', tags: ['satire', 'Singapore']}
]

describe('GET /', () => {
  before ((done) => {
    User.find().remove((err) => console.log('delete all users'))
    Resources.find().remove((err) => console.log('delete all resources'))
    done()
  })
  it('should return a 200 response', (done) => {
    api.get('/')
    .set('Accept', 'application/html')
    .expect(200, done)
  })
})

describe('POST /register', function() {
  this.timeout(10000)

  it('should return "User created." message', (done) => {
    api.post('/register')
    .set('Accept', 'application/html')
    .send(users[0])
    .expect(201)
    .end( (err, response) => {
      expect(response.body.message).to.equal('User created.')
      done()
      })
  })

  it('should return "User created." message', (done) => {
    api.post('/register')
    .set('Accept', 'application/html')
    .send(users[1])
    .expect(201)
    .end( (err, response) => {
      expect(response.body.message).to.equal('User created.')
      done()
      })
  })
})

describe('POST /resources', function() {
  this.timeout(10000)

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[0])
      .set('Accept', 'application/html')
      .set('User-email', 'juschanuk@gmail.com')
      .expect(201, done)
  })

  it('should return a 200 response', function(done) {
    api.post('/resources')
      .send(resources[1])
      .set('Accept', 'application/html')
      .set('User-email', 'william.tam@gmail.com')
      .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[2])
      .set('Accept', 'application/html')
      .set('User-email', 'juschanuk@gmail.com')
      .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[3])
      .set('Accept', 'application/html')
      .set('User-email', 'william.tam@gmail.com')
      .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[4])
      .set('Accept', 'application/html')
      .set('User-email', 'juschanuk@gmail.com')
      .expect(201, done)
  })
})

describe('GET /allresources', () => {
  it('should return a 200 response', (done) => {
    api.get('/allresources')
    .set('Accept', 'application/html')
    .expect(200, done)
  })
})

describe('GET /resources', () => {
  it('should return a 200 response', (done) => {
    User.findOne({email: users[0].email}, (err, user) => {
      if (err) res.status(401).json({error: 'error'})
      api.get('/resources')
      .set('Accept', 'application/html')
      .set('user_email', users[0].email)
      .set('auth_token', user.auth_token)
      .expect(200, done)
    })
  })
})

describe('POST /login', () => {
  it('should return a 200 response and auth_token', (done) => {
    var user = {email: users[0].email, password: users[0].password }
    api.post('/login')
    .set('Accept', 'application/html')
    .send(user)
    // .set({email: 'juschanuk@gmail.com'})
    // .set({password: 'accounting'})
    .expect(200)
    .end( (err, response) => {
      expect(response.body.message).to.equal('User logged in')
      expect(response.body.auth_token).to.exist
      done()
      })
  })
})

describe('DELETE /deleteUser', () => {
  it('should remove a user', (done) => {
    User.findOne({email: users[0].email}, (err, user) => {
      if (err) res.status(422).json({message: 'Error deleting user'})
      else {
        api.delete('/deleteUser')
        .send({user})
        .set('Accept', 'application/html')
        .expect(200)
        .end( (err, response) => {
          expect(response.body.message).to.equal('User and Resources deleted')
          done()
        })
      }
    })
  })
})
