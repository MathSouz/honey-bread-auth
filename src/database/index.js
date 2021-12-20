const { Sequelize } = require("sequelize");
const {
  database,
  host,
  username,
  password,
} = require("../constants/environment_variables");

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
