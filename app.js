const Koa = require('koa')
const app = new Koa()
const defaultRouter = require('./routes/default')
const draughtRouter = require('./routes/draught')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const jwt = require('koa-jwt')
const { SECRET } = require('./utils/config')

app.use(defaultRouter.routes())
app.use(loginRouter.routes())
app.use(userRouter.routes())

app.use(jwt({ secret: SECRET }))

app.use(draughtRouter.routes())

module.exports = app