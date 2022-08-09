const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    dialectOptions: {
      multipleStatements: true,
    },
    pool: {
      max: 10,
      min: 0,
      idle: 30000,
    },
    define: {
      timestamps: false,
    },
  }
);

// new Sequelize(
//   `postgresql://${process.env.PG_DB_USER}@$
//   {process.env.PG_DB_HOST}:
//   ${process.env.PG_DB_PORT}`,
// )

module.exports = sequelize;
