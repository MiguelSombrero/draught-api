const { Draught, User } = require('../models')
const bcrypt = require('bcrypt')

const initializeDatabase = async () => {
  await Draught.sync({ force: true })
  await User.sync({ force: true })
}

const initializeUsers = async () => {
  await User.create({ username: 'somero', password: await bcrypt.hash('miika', 10), name: 'miika' })
  await User.create({ username: 'testinen', password: await bcrypt.hash('testi', 10), name: 'testi' })
}

module.exports = {
  initializeUsers,
  initializeDatabase
}