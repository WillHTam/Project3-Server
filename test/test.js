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
  {id: 1, title: 'Title 1', url: 'http://www.bbc.co.uk', tags: ['news', 'UK'] },
  {id: 2, title: 'Title 2', url: 'http://www.cnn.com', tags: ['news', 'USA'], user: '578c75c738dfc574e632da7e' },
  {id: 3, title: 'Title 3', url: 'http://www.todayonline.com', tags: ['news', 'Singapore'], user: '578c75c738dfc574e632da7e' },
  {id: 4, title: 'Title 4', url: 'http://www.dailymail.co.uk', tags: ['news', 'UK'], user: '578c75c738dfc574e632da7e'},
  {id: 5, title: 'Title 5', url: 'http://www.mrbrown.com', tags: ['satire', 'Singapore'], user: '578c75c738dfc574e632da7e'}
]

describe('GET /', () => {
  // before ((done) => {
  //   User.find().remove((err) => console.log('delete all users'))
  //   Resources.find().remove((err) => console.log('delete all resources'))
  //   done()
  // })
  it('should return a 200 response', (done) => {
    api.get('/')
    .set('Accept', 'application/html')
    .expect(200, done)
  })
})

describe('POST /register', function() {
  this.timeout(10000)

  xit('should return "User created." message', (done) => {
    api.post('/register')
    .set('Accept', 'application/html')
    .send(users[0])
    .expect(201)
    .end( (err, response) => {
      expect(response.body.message).to.equal('User created.')
      done()
      })
  })

  xit('should return "User created." message', (done) => {
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
    // appController.userFind()
    api.post('/resources')
    .send(resources[0])
    .set('Accept', 'application/html')
    .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    appController.userFind()
    api.post('/resources')
    .send(resources[1])
    .set('Accept', 'application/html')
    .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    appController.userFind()
    api.post('/resources')
    .send(resources[2])
    .set('Accept', 'application/html')
    .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    appController.userFind()
    api.post('/resources')
    .send(resources[3])
    .set('Accept', 'application/html')
    .expect(201, done)
  })

  it('should return a 200 response', (done) => {
    appController.userFind()
    api.post('/resources')
    .send(resources[4])
    .set('Accept', 'application/html')
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
