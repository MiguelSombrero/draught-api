const Router = require('@koa/router')
const { Draught, User } = require('../models')
const koaBody = require('koa-body')
const { tokenExtractor } = require('../middleware/jwt')

const draughtRouter = new Router({
  prefix: '/api/draught'
})

draughtRouter
  .get('/', tokenExtractor, async (ctx) => {
    try {
      ctx.body = await Draught.findAll({
        where: {
          userId: ctx.request.decodedToken.id
        }
      })
    } catch (error) {
      ctx.throw(400, error)
    }
  })
  .post('/', koaBody(), tokenExtractor, async (ctx) => {
    try {
      const user = await User.findByPk(ctx.request.decodedToken.id)
      const draught = Draught.build(ctx.request.body)
      draught.userId = user.id
      ctx.body = await draught.save()
      ctx.status = 201
    } catch (error) {
      ctx.throw(400, 'saving draught failed')
    }
  })

module.exports = draughtRouter