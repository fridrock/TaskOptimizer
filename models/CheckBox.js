const { DataTypes, Model } = require("sequelize");
const { sequelizeInstance } = require("../database");
class CheckBox extends Model {}
CheckBox.init(
  {
    checkBoxId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    checkBoxName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    columnId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    checkBoxDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
  }
);

async function createCheckBoxDatabase() {
  await CheckBox.sync();
  console.log("checkbox database created");
}
async function createCheckBox(reqBody) {
  const checkbox = await CheckBox.create({
    columnId: reqBody.columnId,
    checkBoxName: reqBody.checkBoxName,
    checkBoxDone: reqBody.checkBoxDone,
  });
  await checkbox.save();
  return checkbox;
}
async function updateCheckBox(reqBody) {
  const checkBox = await CheckBox.findByPk(reqBody.checkBoxId);
  await CheckBox.update(
    {
      checkBoxDone: !checkBox.checkBoxDone,
    },
    { where: { checkBoxId: reqBody.checkBoxId } }
  );
}
module.exports = {
  CheckBox,
  createCheckBoxDatabase,
  createCheckBox,
  updateCheckBox,
};
