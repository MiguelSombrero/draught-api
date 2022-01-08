require('dotenv').config()

let DATABASE_URL=process.env.DATABASE_URL

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  DATABASE_URL = process.env.TEST_DATABASE_URL
}

module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL,
  SECRET: process.env.SECRET
}