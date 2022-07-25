const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  `postgresql://${process.env.PG_DB_USER}@${process.env.PG_DB_HOST}:${process.env.PG_DB_PORT}`,
)

module.export = sequelize;


