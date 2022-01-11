const Router = require('@koa/router')
const { User } = require('../models')
const koaBody = require('koa-body')
const bcrypt = require('bcrypt')

const userRouter = new Router({
  prefix: '/api/user'
})

userRouter
  .post('/', koaBody(), async (ctx) => {
    try {
      const user = User.build(ctx.request.body)
      const passwordHash = await bcrypt.hash(user.password, 10)
      user.password = passwordHash
      ctx.body = await user.save()
      ctx.status = 201
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'saving user failed')
    }
  })

module.exports = userRouter