require('dotenv').config()
const app = require('./app')
const { PORT } = require('./utils/config')
const { sequelize } = require('./utils/db')
const { connectToDatabase } = require('./utils/db')

const start = async () => {
  await connectToDatabase()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  }).on('error', (error) => {
    console.log('message:', error.message)
    console.log('stack:', error.stack)
    console.log('name:', error.name)
  }).on('close', () => {
    console.log('closing server')
    sequelize.close()
  })
}

start()