const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "dav23eumf4cs6p",
  host: "ec2-3-216-40-16.compute-1.amazonaws.com",
  username: "lhncsdkahmkdwc",
  password: "ea2abafe49f20aef37d1e768af6ce97d48f106e903960102e3df9e9f69e57725",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
