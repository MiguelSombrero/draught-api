const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const tokenExtractor = async (ctx, next) => {
  const authorization = ctx.request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      ctx.request.decodedToken = await jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      ctx.throw(400, 'token invalid')
    }
  } else {
    ctx.throw(400, 'token missing')
  }
  return next()
}

module.exports = { tokenExtractor }