const { DataTypes, Model } = require("sequelize");
const { sequelizeInstance } = require("../database");
class Column extends Model {}
Column.init(
  {
    columnId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    columnName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
  }
);
async function createColumnDatabase() {
  await Column.sync();
  console.log("column database created");
}
async function createColumn(reqBody) {
  const column = await Column.create({
    planId: reqBody.planId,
    columnName: reqBody.columnName,
  });
  await column.save();
  return column;
}
module.exports = { Column, createColumnDatabase, createColumn };
