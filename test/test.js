/* globals describe it before */
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const app = require('../app')

describe('GET /', () => {
  it('should return a 200 response', (done) => {
    api.get('/')
    .set('Accept', 'application/html')
    .expect(200, done)
  })
})

describe('POST /register', () => {
  it('should return "User created." message', (done) => {
    api.post('/register')
    .set('Accept', 'application/html')
    .send({first_name: 'Justin', last_name: 'Chan', email: 'juschanuk@gmail.com', password: 'accounting'})
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
