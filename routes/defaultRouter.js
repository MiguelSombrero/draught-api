const Router = require('@koa/router')

const defaultRouter = new Router({
    prefix: "/api"
})

defaultRouter
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!'
  });

  module.exports = defaultRouter