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
  {url: 'http://www.todayonline.com/business/opportunity-deals-be-had-office-rents-continue-slide', tags: ['news', 'Singapore'], summary: 'Summary for the third article'},
  {title: 'Title 5', url: 'http://www.mrbrown.com/blog/2016/07/rules-of-the-all-father-regarding-your-new-iphones.html', tags: ['satire', 'Singapore'], site_name: 'mrbrown.com', summary: 'Summary for the fifth article'},
  {url: 'http://edition.cnn.com/2016/07/19/weather/hottest-june-record-world/index.html'},
  {url: 'http://nautil.us/issue/37/currents/the-strange-blissfulness-of-storms?as-seen-on-www.curat.io'},
  {url: 'https://backchannel.com/inside-the-obama-tech-surge-as-it-hacks-the-pentagon-and-va-8b439bc33ed1'},
  {url: 'http://edition.cnn.com/2016/07/20/politics/boris-johnson-john-kerry-presser/index.html'}
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

describe('POST /resources', function() {
  this.timeout(10000000)

  xit('should return a 200 response 1', (done) => {
    api.post('/resources')
      .send(resources[0])
      .set('Accept', 'application/html')
      .set('email', 'juschanuk@gmail.com')
      .expect(201, done)
  })

  xit('should return a 200 response 2', function (done) {
    api.post('/resources')
      .send(resources[1])
      .set('Accept', 'application/html')
      .set('email', 'william.tam@gmail.com')
      .expect(201, done)
  })

  xit('should return a 200 response 3', (done) => {
    api.post('/resources')
      .send(resources[2])
      .set('Accept', 'application/html')
      .set('email', 'juschanuk@gmail.com')
      .expect(201, done)
  })

  xit('should return a 200 response 4', (done) => {
    api.post('/resources')
      .send(resources[3])
      .set('Accept', 'application/html')
      .set('email', 'william.tam@gmail.com')
      .expect(201, done)
  })

  xit('should return a 200 response 5', (done) => {
    api.post('/resources')
      .send(resources[4])
      .set('Accept', 'application/html')
      .set('email', 'juschanuk@gmail.com')
      .expect(201, done)
  })

  xit('should return a 200 response 6', (done) => {
    api.post('/resources')
      .send(resources[5])
      .set('Accept', 'application/html')
      .set('email', 'angel@angel.com')
      .expect(201, done)
  })

  xit('should return a 401 response', (done) => {
    api.post('/resources')
    .send(resources[6])
    .set('Accept', 'application/html')
    .expect(401, done)
  })

  xit('should return a 401 response', (done) => {
    api.post('/resources')
    .send(resources[6])
    .set('Accept', 'application/html')
    .set('email', 'blah@blah.com')
    .expect(401, done)
  })

  xit('should return a 200 response 7', (done) => {
    api.post('/resources')
      .send(resources[6])
      .set('Accept', 'application/html')
      .set('email', 'angel@angel.com')
      .expect(201, done)
  })

  xit('should return a 200 response 8', (done) => {
    api.post('/resources')
      .send(resources[7])
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
    var user = {email: users[0].email, password: users[0].password}
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
          .expect(401)
          .end( (err, response) => {
            expect(response.body.error).to.equal('User not found (deleteResource)')
            done()
          })
        }
      })
    })
  })

  it('should remove a resource', (done) => {
    User.findOne({email: users[0].email}, (err, user) => {
      Resources.findOne({user}, (err, resource) => {
        if (err) res.status(422).json({message: 'Error finding resource'})
        else {
          var resourceID = resource._id
          api.delete('/resources')
          .send({id: resourceID})
          .set('Accept', 'application/html')
          .set('email', users[0].email)
          .set('auth_token', user.auth_token)
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
        .end((err, response) => {
          expect(response.body.message).to.equal('User and Resources deleted')
          done()
        })
      }
    })
  })
})

describe('PUT /user', function () {
  it('should edit the user', (done) => {
    User.findOne({email: users[0].email}, (err, user) => {
      if (err) res.status(401).json({error: 'error'})
      var user1 = {first_name: 'Brian', last_name: 'Lopez', email: 'blopez@gmail.com', password: 'mexico'}
      api.put('/user')
      .set('Accept', 'application/html')
      .set('email', user.email)
      .set('auth_token', user.auth_token)
      .send(user1)
      .expect(200)
      .end((err, response) => {
        expect(response.body.message).to.equal('User successfully updated')
        done()
        })
    })
  })
})

describe('PUT /resources', function () {
  it('should edit the resource', (done) => {
    User.findOne({email: users[2].email}, (err, user) => {
      Resources.findOne({user}, (err, resource) => {
        if (err) res.status(401).json({error: 'error'})
        var resource1 = {id: resource._id, title: 'Replacement Title', url: 'http://edition.cnn.com/2016/07/18/asia/north-korea-missiles/index.html', site_name: 'test.com', summary: 'EDITED ENTRY'}
        api.put('/resources')
        .set('Accept', 'application/html')
        .send(resource1)
        .expect(200)
        .end((err, response) => {
          expect(response.body.message).to.equal('Resource updated')
          done()
        })
      })
    })
  })
})
