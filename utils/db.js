const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const Umzug = require('umzug')

let SEQUELIZE_CONF = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  SEQUELIZE_CONF = {}
}

const sequelize = new Sequelize(DATABASE_URL, SEQUELIZE_CONF)

const runMigrations = async () => {
  const migrator = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      tableName: 'migrations',
    },
    migrations: {
      params: [sequelize.getQueryInterface()],
      path: `${process.cwd()}/migrations`,
      pattern: /\.js$/,
    },
  })
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.file),
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('database connected')
  } catch (err) {
    console.log('connecting database failed')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }