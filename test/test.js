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
  {first_name: 'William', last_name: 'Tam', email: 'william.tam@gmail.com', password: 'cat'},
  {first_name: 'Angel', last_name: 'Chen', email: 'angel@angel.com', password: 'germany'}
]

resources = [
  {title: 'Title 1', url: 'http://www.bbc.com/news/business-36831820', tags: ['news', 'UK'], site_name: 'BBC.co.uk', summary: 'Summary for the first article'},
  {title: 'Title 2', url: 'http://edition.cnn.com/2016/07/19/politics/melania-trump-michelle-obama-speech/index.html', tags: ['news', 'USA'], site_name: 'edition.cnn.com', summary: 'Summary for the second article'},
  {title: 'Title 3', url: 'http://www.todayonline.com/business/opportunity-deals-be-had-office-rents-continue-slide', tags: ['news', 'Singapore'], site_name: 'todayonline.com', summary: 'Summary for the third article'},
  {title: 'Title 4', url: 'http://www.dailymail.co.uk/tvshowbiz/article-3696277/PICTURE-EXCLUSIVE-Christina-Milian-s-plunging-swimsuit-slips-leaves-overexposed-beach-break-Ibiza.html', tags: ['news', 'UK'], site_name: 'dailymail.co.uk', summary: 'Summary for the fourth article'},
  {title: 'Title 5', url: 'http://www.mrbrown.com/blog/2016/07/rules-of-the-all-father-regarding-your-new-iphones.html', tags: ['satire', 'Singapore'], site_name: 'mrbrown.com', summary: 'Summary for the fifth article'},
  {title: 'Title 6', url: 'http://www.mrbrown.com/blog/2016/07/rules-of-the-all-father-regarding-your-new-iphones.html', tags: ['satire', 'Singapore'], site_name: 'mrbrown.com', summary: 'Summary for the SIXTH article'},
  {title: 'Title 7', url: 'http://www.mrbrown.com/blog/2016/07/rules-of-the-all-father-regarding-your-new-iphones.html', tags: ['satire', 'Singapore'], site_name: 'mrbrown.com', summary: 'Summary for the SEVENTH article'}
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

  it('should return "User created." message', (done) => {
    api.post('/register')
    .set('Accept', 'application/html')
    .send(users[2])
    .expect(201)
    .end( (err, response) => {
      expect(response.body.message).to.equal('User created.')
      done()
      })
  })
})

describe('PUT /user', function() {
  xit('should edit the user', (done) => {
    User.findOne({email: users[0].email}, (err, user) => {
      if (err) res.status(401).json({error: 'error'})
      var userX = {first_name: 'Brian', last_name: 'Lopez', email: 'blopez@gmail.com', password: 'mexico'}
      api.get('/resources')
      .send({userX})
      .set('Accept', 'application/html')
      .set('email', users[0].email)
      .set('auth_token', user.auth_token)
      .end( (err, response) => {
        expect(response.body.message).to.equal('User successfully updated')
        done()
        })
    })
  })
})

describe('POST /resources', function() {
  this.timeout(10000)

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[0])
      .set('Accept', 'application/html')
      .set('email', 'juschanuk@gmail.com')
      .expect(201, done)
  })

  it('should return a 200 response', function(done) {
    api.post('/resources')
      .send(resources[1])
      .set('Accept', 'application/html')
      .set('email', 'william.tam@gmail.com')
      .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[2])
      .set('Accept', 'application/html')
      .set('email', 'juschanuk@gmail.com')
      .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[3])
      .set('Accept', 'application/html')
      .set('email', 'william.tam@gmail.com')
      .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[4])
      .set('Accept', 'application/html')
      .set('email', 'juschanuk@gmail.com')
      .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[5])
      .set('Accept', 'application/html')
      .set('email', 'angel@angel.com')
      .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    api.post('/resources')
      .send(resources[6])
      .set('Accept', 'application/html')
      .set('email', 'angel@angel.com')
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
      .set('email', users[0].email)
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
    .expect(200)
    .end( (err, response) => {
      expect(response.body.message).to.equal('User logged in')
      expect(response.body.auth_token).to.exist
      done()
      })
  })
})

describe('DELETE /resources', () => {
  it('should remove a resource', (done) => {
    User.findOne({email: users[0].email}, (err, user) => {
      Resources.findOne({user}, (err, resource) => {
        if (err) res.status(422).json({message: 'Error finding resource'})
        else {
          var resourceID = resource._id
          api.delete('/resources')
          .send({id: resourceID})
          .set('Accept', 'application/html')
          .expect(200)
          .end( (err, response) => {
            expect(response.body.message).to.equal('Resource deleted')
            done()
          })
        }
      })
    })
  })
})

describe('DELETE /deleteUser', () => {
  it('should remove a user', (done) => {
    User.findOne({email: users[1].email}, (err, user) => {
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
