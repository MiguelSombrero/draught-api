const Router = require('@koa/router')
const { User } = require('../models')
const { SECRET } = require('../utils/config')
const koaBody = require('koa-body')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginRouter = new Router({
  prefix: '/api/login'
})

loginRouter.post('/', koaBody(), async (ctx) => {
  const body = ctx.request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = !user
    ? false
    : await bcrypt.compare(body.password, user.password)

  if (!(user && passwordCorrect)) {
    ctx.throw(401, 'Unauthorized')
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  ctx.body = { token, id: user.id, username: user.username, name: user.name }
})

module.exports = loginRouter