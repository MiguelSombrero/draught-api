const app = require('../app')
const server = app.listen()
const request = require('supertest').agent(server)
const helper = require('./test_helper')
const { sequelize } = require('../utils/db')

let login = null

beforeEach(async () => {
  //await helper.initializeDatabase()
  await helper.initializeUsers()

  login = await request
    .post('/api/login')
    .send({ username: 'somero', password: 'miika' })
})

describe('Using Draughts router', function() {
  describe('POST /draught', function() {
    describe('with valid Draught and token', function() {
      it('should work', async function(done) {
        request
          .post('/api/draught')
          .set('Authorization', 'Bearer ' + login.body.token)
          .send({
            beverageType: 'whisky',
            abv: 40,
            volume: 0.04
          })
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .expect({ id: 1, beverageType: 'whisky', abv: '40', volume: '0.04', userId: 1 }, done)
      })
    })

    describe('with Draught without authorization header', function() {
      it('should throw 401', async function() {
        const response = await request
          .post('/api/draught')
          .send({
            beverageType: 'whisky',
            abv: 40,
            volume: 0.04
          })
          .expect(401)

        expect(response.error.text).toContain('Authentication Error')
      })
    })

    describe('with Draught without type', function() {
      it('should throw 400', async function() {
        const response = await request
          .post('/api/draught')
          .set('Authorization', 'Bearer ' + login.body.token)
          .send({
            abv: 40,
            volume: 0.04
          })
          .expect(400)

        expect(response.error.text).toContain('saving draught failed')
      })
    })

  })
})

afterAll(async () => {
  sequelize.close()
  server.close()
})