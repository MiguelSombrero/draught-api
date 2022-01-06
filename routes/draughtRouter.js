const Router = require('@koa/router')
const Draught = require('../model/draught')
const koaBody = require('koa-body')

const draughtRouter = new Router({
    prefix: '/api/draught'
  })
  
  draughtRouter
    .get('/', async (ctx, next) => {
      try {
        ctx.body = await Draught.findAll()
      } catch (error) {
        ctx.throw(400, error)
      }
    })
    .post('/', koaBody(), async (ctx, next) => {
      try {
        const draught = Draught.build(ctx.request.body)
        console.log(ctx.request.body)
        ctx.body = await draught.save()
      } catch (error) {
        ctx.throw(400, error)
      }
    });
  
    module.exports = draughtRouter