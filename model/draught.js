const config = require('../utils/config')
const { Sequelize, Model, DataTypes } = require('sequelize')

console.log(`database url is: ${config.DATABASE_URL}`)

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialectOptions: {},
})

class Draught extends Model {}
Draught.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  beverageType: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  abv: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  volume: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'draught'
})

Draught.sync()

module.exports = Draught
