const app = require('../app')
const server = app.listen()
const request = require('supertest').agent(server)
const helper = require('./test_helper')
const { sequelize } = require('../utils/db')

beforeEach(async () => {
  await helper.initializeDatabase()
  await helper.initializeUsers()
})

describe('Using Login router', function() {
  describe('POST /login', function() {
    describe('with valid credentials', function() {
      it('succeeds', async () => {
        const response = await request
          .post('/api/login')
          .send({ username: 'somero', password: 'miika' })
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const body = response.body

        expect(body.id).toBeDefined()
        expect(body.username).toBe('somero')
        expect(body.name).toBe('miika')
        expect(body.token).toBeDefined()
        expect(body.password).not.toBeDefined()
      })
    })

    describe('with wrong username', function() {
      it('fails', async () => {
        const response = await request
          .post('/api/login')
          .send({ username: 'eiloydy', password: 'miika' })
          .expect(401)
          .expect('Content-Type', /text\/plain/)

        expect(response.error.text).toBe('Unauthorized')
      })
    })

    describe('with wrong password', function() {
      it('fails', async () => {
        const response = await request
          .post('/api/login')
          .send({ username: 'somero', password: 'eiloydy' })
          .expect(401)
          .expect('Content-Type', /text\/plain/)

        expect(response.error.text).toBe('Unauthorized')
      })
    })
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})