const Draught = require('./draught')
const User = require('./user')

User.hasMany(Draught)
Draught.belongsTo(User)

Draught.sync({ alter: true })
User.sync({ alter: true })

module.exports = {
  Draught, User
}