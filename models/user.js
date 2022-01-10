const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
})

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get())
  delete values.password
  return values
}

module.exports = User