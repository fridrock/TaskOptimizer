const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  host: "localhost",
  logging: console.log,
});
async function connect() {
  try {
    await sequelize.authenticate();
    console.log("connected to database");
  } catch (error) {
    console.log("error");
  }
}
module.exports = connect;
