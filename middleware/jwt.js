const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const tokenExtractor = (ctx, next) => {
  const authorization = ctx.request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      ctx.request.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return ctx.throw(400, 'token invalid')
    }
  } else {
    return ctx.throw(400, 'token missing')
  }
  next()
}

module.exports = { tokenExtractor }