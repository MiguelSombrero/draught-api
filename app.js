require('dotenv').config()
const Koa = require('koa')
const app = new Koa()
const defaultRouter = require('./routes/defaultRouter')
const draughtRouter = require('./routes/draughtRouter')

app.use(defaultRouter.routes())
app.use(draughtRouter.routes())

module.exports = app