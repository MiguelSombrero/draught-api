require('dotenv').config()
const Koa = require('koa')
const app = new Koa();
const defaultRouter = require('./routes/defaultRouter')
const draughtRouter = require('./routes/draughtRouter')
const config = require('./utils/config')

app.use(defaultRouter.routes())
app.use(draughtRouter.routes())

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
  }).on('error', (error) => {
    console.log('message:', error.message)
    console.log('stack:', error.stack)
    console.log('name:', error.name)
  });