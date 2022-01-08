const Router = require('@koa/router')
const { User } = require('../models')
const koaBody = require('koa-body')

const userRouter = new Router({
  prefix: '/api/user'
})

userRouter
  .post('/', koaBody(), async (ctx) => {
    try {
      const body = ctx.request.body
      const user = User.build(body)
      ctx.body = await user.save()
    } catch (error) {
      ctx.throw(400, 'saving user failed')
    }
  })

module.exports = userRouter