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
    columnPriority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    columnWidth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checkBoxCount: {
      type: DataTypes.INTEGER,
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
    columnWidth: reqBody.columnWidth,
    columnPriority: reqBody.columnPriority,
  });
  await column.save();
  return column;
}
async function deleteColumn(columnId) {
  await Column.destroy({
    where: {
      columnId: columnId,
    },
  });
}
module.exports = { Column, createColumnDatabase, createColumn, deleteColumn };
