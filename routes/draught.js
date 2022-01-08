const Router = require('@koa/router')
const { Draught, User } = require('../models')
const koaBody = require('koa-body')
const { tokenExtractor } = require('../middleware/jwt')

const draughtRouter = new Router({
  prefix: '/api/draught'
})

draughtRouter
  .get('/', async (ctx) => {
    try {
      ctx.body = await Draught.findAll()
    } catch (error) {
      ctx.throw(400, error)
    }
  })
  .post('/', koaBody(), tokenExtractor, async (ctx) => {
    try {
      const user = await User.findByPk(ctx.request.decodedToken.id)
      ctx.body = await Draught.create({ ...ctx.request.body, userId: user.id })
    } catch (error) {
      ctx.throw(400, 'saving draught failed')
    }
  })

module.exports = draughtRouter