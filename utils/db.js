const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

let SEQUELIZE_CONF = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  SEQUELIZE_CONF = {}
}

const sequelize = new Sequelize(DATABASE_URL, SEQUELIZE_CONF)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
  } catch (err) {
    console.log('connecting database failed')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }