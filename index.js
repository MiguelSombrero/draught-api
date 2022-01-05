require('dotenv').config()
const Koa = require('koa')
const Router = require('@koa/router')
const koaBody = require('koa-body')
const app = new Koa();
const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {},
})

class Draught extends Model {}
Draught.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  beverageType: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  abv: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  volume: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'draught'
})

Draught.sync()

const helloRouter = new Router()

const draughtRouter = new Router({
  prefix: '/draught'
})

helloRouter
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!'
  });

draughtRouter
  .get('/', async (ctx, next) => {
    ctx.body = await Draught.findAll()
  })
  .post('/', async (ctx, next) => {
    try {
      const draught = Draught.build(ctx.request.body)
      console.log(ctx.request.body)
      ctx.body = await draught.save()
    } catch (error) {
      ctx.throw(400, error)
    }
  });

app.use(koaBody())
app.use(helloRouter.routes())
app.use(draughtRouter.routes())

app.listen(3000);