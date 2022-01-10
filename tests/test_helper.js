const { Draught, User } = require('../models')
const bcrypt = require('bcrypt')

const initializeDatabase = async () => {
  try {
    await Draught.destroy({ where: { } })
    await User.destroy({ where: { } })
  } catch(error) {
    console.log('error on initializing test database')
  }
}

const initializeUsers = async () => {
  try {
    await User.create({ id: 1, username: 'somero', password: await bcrypt.hash('miika', 10), name: 'miika' })
    await User.create({ id: 2, username: 'testinen', password: await bcrypt.hash('testi', 10), name: 'testi' })
  } catch(error) {
    console.log('error on initializing test users')
  }
}

const initializeDraughts = async () => {
  try {
    await Draught.create({ beverageType: 'whisky', abv: 40.0, volume: 40, userId: 1 })
    await Draught.create({ beverageType: 'beer', abv: 5.5, volume: 500, userId: 1 })
    await Draught.create({ beverageType: 'wine', abv: 14.0, volume: 120, userId: 1 })
    await Draught.create({ beverageType: 'whisky', abv: 43.0, volume: 40, userId: 2 })
    await Draught.create({ beverageType: 'whisky', abv: 42.0, volume: 40, userId: 2 })
  } catch(error) {
    console.log('error on initializing test draughts')
  }
}

module.exports = {
  initializeUsers,
  initializeDatabase,
  initializeDraughts
}