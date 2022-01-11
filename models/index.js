const Draught = require('./draught')
const User = require('./user')

User.hasMany(Draught)
Draught.belongsTo(User)

module.exports = {
  Draught, User
}