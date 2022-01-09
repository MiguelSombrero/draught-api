const { Draught, User } = require('../models')
const bcrypt = require('bcrypt')

const initializeDatabase = async () => {
  await Draught.destroy({ where: { } })
  await User.destroy({ where: { } })
}

const initializeUsers = async () => {
  await User.create({ username: 'somero', password: await bcrypt.hash('miika', 10), name: 'miika' })
  await User.create({ username: 'testinen', password: await bcrypt.hash('testi', 10), name: 'testi' })
}

module.exports = {
  initializeUsers,
  initializeDatabase
}