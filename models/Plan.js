const { DataTypes, Model } = require("sequelize");
const { sequelizeInstance } = require("../database.js");
class Plan extends Model {}
Plan.init(
  {
    planId: {
      primaryKey: true,
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
  }
);
async function createPlanDatabase() {
  await Plan.sync();
  console.log("Plan database created");
}
async function createPlan(userId, planName) {
  const plan = await Plan.create({
    planName: planName,
    userId: userId,
  });
  await plan.save();
  return plan;
}
async function deletePlan(planId) {
  await Plan.destroy({
    where: {
      planId: planId,
    },
  });
}
module.exports = { createPlanDatabase, createPlan, deletePlan, Plan };
