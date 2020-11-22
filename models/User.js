const { DataTypes, Model } = require("sequelize");
const { noSuchUser } = require("../customErrors/noSuchUser.js");
const { UserWithSameLogin } = require("../customErrors/UserWithSameLogin.js");
const { sequelizeInstance } = require("../database.js");

class User extends Model {}
User.init(
  {
    userId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    login: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeInstance,
  }
);
async function createUserDatabase() {
  await User.sync();
  console.log("user database created");
}
async function authUser(login, password) {
  const user = await User.findAll({
    where: {
      login: login,
      password: password,
    },
    raw: true,
  });
  if (user.length > 0) {
    return user[0];
  } else {
    throw new noSuchUser("wrong password or login");
  }
}
async function createUser(name, surname, login, password) {
  const userWithSameLogin = await User.count({
    where: {
      login: login,
    },
  });

  if (userWithSameLogin) {
    throw new UserWithSameLogin(
      "there is user with the same login, try to switch it to another"
    );
  }
  const user = await User.create({
    name: name,
    surname: surname,
    login: login,
    password: password,
  });
  await user.save();
  return user;
}

module.exports = { User, createUserDatabase, createUser, authUser };
