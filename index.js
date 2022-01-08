require('dotenv').config()
const app = require('./app')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}).on('error', (error) => {
  console.log('message:', error.message)
  console.log('stack:', error.stack)
  console.log('name:', error.name)
})