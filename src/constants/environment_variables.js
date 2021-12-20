const database = process.env.DATABASE;
const host = process.env.HOST;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const jwtSecret = process.env.JWT_SECRET;

module.exports = { database, host, username, password, jwtSecret };
