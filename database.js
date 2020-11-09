const { Sequelize } = require("sequelize");
const sequelizeInstance = new Sequelize({
  dialect: "sqlite",
  host: "localhost",
  logging: console.log,
  storage: "./database.sqlite",
});
async function connect() {
  try {
    await sequelizeInstance.authenticate();
    console.log("connected to database");
  } catch (error) {
    console.log("error");
  }
}
async function createUsersDatabase() {
  try {
    await User.sync();
    console.log("created user database");
  } catch (e) {
    console.log(e);
  }
}

module.exports = { connect, createUsersDatabase, sequelizeInstance };
