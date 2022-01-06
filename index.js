require('dotenv').config()
const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
}).on('error', (error) => {
  console.log('message:', error.message)
  console.log('stack:', error.stack)
  console.log('name:', error.name)
})