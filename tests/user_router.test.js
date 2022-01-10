const app = require('../app')
const server = app.listen()
const request = require('supertest').agent(server)
const helper = require('./test_helper')
const { sequelize } = require('../utils/db')

beforeEach(async () => {
  await helper.initializeDatabase()
})

describe('Using Users router', function() {
  describe('POST /user', function() {
    describe('with valid user', function() {
      it('should work', async function() {
        const response = await request
          .post('/api/user')
          .send({
            username: 'testilä',
            password: 'salainen',
            name: 'testi'
          })
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const body = response.body

        expect(body.id).toBeDefined()
        expect(body.username).toBe('testilä')
        expect(body.name).toBe('testi')
        expect(body.password).not.toBeDefined()
      })
    })
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})