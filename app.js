require('dotenv').config()
const Koa = require('koa')
const app = new Koa()
const defaultRouter = require('./routes/defaultRouter')
const draughtRouter = require('./routes/draughtRouter')
const userRouter = require('./routes/userRouter')

app.use(defaultRouter.routes())
app.use(draughtRouter.routes())
app.use(userRouter.routes())

module.exports = app