const { Sequelize } = require("sequelize");
const sequelizeInstance = new Sequelize({
  dialect: "sqlite",
  host: "localhost",
  logging: console.log,
});
async function connect() {
  try {
    await sequelizeInstance.authenticate();
    console.log("connected to database");
  } catch (error) {
    console.log("error");
  }
}
module.exports = { connect, sequelizeInstance };
