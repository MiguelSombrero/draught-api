const { sequelize } = require('../utils/db')
const { Model, DataTypes } = require('sequelize')

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

module.exports = Draught
