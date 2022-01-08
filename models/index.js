const Draught = require('./draught')
const User = require('./user')

Draught.sync()
User.sync()

module.exports = {
  Draught, User
}