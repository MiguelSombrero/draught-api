const Router = require('@koa/router')
const Draught = require('../model/draught')
const koaBody = require('koa-body')

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
  .post('/', koaBody(), async (ctx) => {
    try {
      const body = ctx.request.body
      const draught = Draught.build(body)
      ctx.body = await draught.save()
    } catch (error) {
      ctx.throw(400, 'saving draught failed')
    }
  })

module.exports = draughtRouter