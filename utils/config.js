require('dotenv').config()

let PORT=process.env.PORT || 3000
let DATABASE_URL=process.env.DATABASE_URL

if (process.env.NODE_ENV === 'test') {
  DATABASE_URL = process.env.TEST_DATABASE_URL
}

module.exports = {
  PORT,
  DATABASE_URL
}