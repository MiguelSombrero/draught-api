require('dotenv').config()

let PORT=process.env.PORT || 3000

let DATABASE_URL=process.env.DATABASE_URL

let SEQUELIZE_CONF = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  DATABASE_URL = process.env.TEST_DATABASE_URL
  SEQUELIZE_CONF = {}
}

module.exports = {
  PORT,
  DATABASE_URL,
  SEQUELIZE_CONF
}