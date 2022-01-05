require('dotenv').config()
const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa();
const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {},
})

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()

class Draught extends Model {}
Draught.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  beverageType: {
    type: DataTypes.ENUM('beer', 'wine', 'whisky'),
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
  modelName: 'note'
})

const helloRouter = new Router()

const draughtRouter = new Router({
  prefix: '/draught'
})

helloRouter
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!'
  });

draughtRouter
  .get('/', (ctx, next) => {
    ctx.body = 'Hello draught!'
  })
  .post('/', (ctx, next) => {
    // ...
  });

app.use(helloRouter.routes())
app.use(draughtRouter.routes())

app.listen(3000);