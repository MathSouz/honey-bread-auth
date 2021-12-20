const { Sequelize } = require("sequelize");

const database = process.env.DATABASE;
const host = process.env.HOST;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const sequelize = new Sequelize({
  dialect: "postgres",
  database: database,
  host: host,
  username: username,
  password: password,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
