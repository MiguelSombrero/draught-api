const app = require('../app')
const server = app.listen()
const request = require('supertest').agent(server)
const Draught = require('../models/draught')

beforeEach(async () => {
  await Draught.sync({ force: true })
})

describe('Saving Draughts in database', function() {
  describe('POST /draught', function() {
    describe('with valid Draught', function() {
      it('should work', function(done) {
        request
          .post('/api/draught')
          .send({
            beverageType: 'whisky',
            abv: 40,
            volume: 0.04
          })
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .expect({ id: 1, beverageType: 'whisky', abv: '40', volume: '0.04' }, done)
      })
    })

    describe('with Draught without type', function() {
      it('should throw 400', async function() {
        const response = await request
          .post('/api/draught')
          .send({
            abv: 40,
            volume: 0.04
          })
          .expect(400)

        //expect(response.body.error).toContain('saving draught failed')
      })
    })
  })
})

afterAll(() => {
  server.close()
})