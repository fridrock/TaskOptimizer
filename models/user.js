const { Model, DataTypes } = require("sequelize");
const { sequelizeInstance } = require("../database");
class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
  }
);
async function createUsersDatabase() {
  try {
    await User.sync();

    console.log("created user database");
  } catch (e) {
    console.log(e);
  }
}
async function createUser(name, surname, login, password) {
  const newUser = User.build({
    firstName: name,
    surName: surname,
    login: login,
    password: password,
  });

  await newUser.save();
}
module.exports = { createUsersDatabase, createUser };
