const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

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
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  volume: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'draught'
})

module.exports = Draught
