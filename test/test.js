/* globals describe it before */
var util = require('util')
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const app = require('../app')
const User = require('../models/user')
const Resources = require('../models/resources')

users = [
  {first_name: 'Justin', last_name: 'Chan', email: 'juschanuk@gmail.com', password: 'accounting'},
  {first_name: 'William', last_name: 'Tam', email: 'william.tam@gmail.com', password: 'cat'}
]

resources = [
  {title: 'Title 1', url: 'http://www.bbc.co.uk', tags: ['news', 'UK'], user: users[0].id },
  {title: 'Title 2', url: 'http://www.cnn.com', tags: ['news', 'USA'], user: users[1].id },
  {title: 'Title 3', url: 'http://www.todayonline.com', tags: ['news', 'Singapore'], user: users[0].id },
  {title: 'Title 4', url: 'http://www.dailymail.co.uk', tags: ['news', 'UK'], user: users[1].id },
  {title: 'Title 5', url: 'http://www.mrbrown.com', tags: ['satire', 'Singapore'], user: users[0].id }
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

describe('POST /resources', () => {
  it('should return a 200 response', (done) => {
    api.post('/resources')
    .send({})
    .set('Accept', 'application/html')
    .expect(200, done)
  })
})

describe('GET /allresources', () => {
  it('should return a 200 response', (done) => {
    api.get('/allresources')
    .set('Accept', 'application/html')
    .expect(200, done)
  })
})

// describe('GET /apples', () => {
//   it('should return a 200 response', (done) => {
//     api.get('/apples')
//     .set('Accept', 'application/json')
//     .expect(200, done)
//   })
//   it('should return an array', (done) => {
//     api.get('/apples')
//     .set('Accept', 'application/json')
//     .end((error, response) => {
//       expect(error).to.be.a('null')
//       expect(response.body).to.be.an('array')
//       done()
//     })
//   })
// })
//
