const app = require('../app')
const server = app.listen()
const request = require('supertest').agent(server)
const helper = require('./test_helper')
const { sequelize } = require('../utils/db')

let login = null

beforeAll(async () => {
  await helper.initializeDatabase()
  await helper.initializeUsers()
  await helper.initializeDraughts()

  login = await request
    .post('/api/login')
    .send({ username: 'somero', password: 'miika' })
})

describe('Using Draughts router', function() {
  describe('GET /draught', function() {
    describe('with valid token', function() {
      it('should return own draughts', async function() {
        const response = await request
          .get('/api/draught')
          .set('Authorization', 'Bearer ' + login.body.token)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const body = response.body

        expect(body.length).toBe(3)
      })
    })


  })
})

describe('Using Draughts router', function() {
  describe('POST /draught', function() {
    describe('with valid Draught and token', function() {
      it('should work', async function() {
        const response = await request
          .post('/api/draught')
          .set('Authorization', 'Bearer ' + login.body.token)
          .send({
            beverageType: 'whisky',
            abv: 40.0,
            volume: 40
          })
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const body = response.body

        expect(body.id).toBeDefined()
        expect(body.beverageType).toBe('whisky')
        expect(body.abv).toBe(40.0)
        expect(body.volume).toBe(40)
        expect(body.userId).toBe(login.body.id)
      })
    })

    describe('with Draught without authorization header', function() {
      it('should throw 401', async function() {
        const response = await request
          .post('/api/draught')
          .send({
            beverageType: 'whisky',
            abv: 40.0,
            volume: 40
          })
          .expect(401)

        expect(response.error.text).toContain('Authentication Error')
      })
    })

    describe('with Draught with wrong authorization header', function() {
      it('should throw 401', async function() {
        const response = await request
          .post('/api/draught')
          .set('Authorization', 'Bearer eiloydy')
          .send({
            beverageType: 'whisky',
            abv: 40.0,
            volume: 40
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
            abv: 40.0,
            volume: 40
          })
          .expect(400)

        expect(response.error.text).toContain('saving draught failed')
      })
    })
  })
})

afterAll(() => {
  sequelize.close()
  server.close()
})