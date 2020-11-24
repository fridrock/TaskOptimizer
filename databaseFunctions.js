const { createUserDatabase } = require("./models/user");
const { createPlanDatabase, Plan } = require("./models/plan");
const { createColumnDatabase, Column } = require("./models/Column");
const { createCheckBoxDatabase, CheckBox } = require("./models/CheckBox");

async function createDatabaseModels() {
  createUserDatabase();
  createPlanDatabase();
  createColumnDatabase();
  createCheckBoxDatabase();
}
async function browseAllData(userId) {
  const plans = await findPlans(userId);
  for (let i = 0; i < plans.length; i++) {
    let plan = plan[i];
    plan.columns = await findColumns(plan.planId);
    for (let j = 0; j < plans[i].columns.length; j++) {
      let column = plans[i].columns[j];
      column.checkBoxes = await findCheckBoxes(column.columnId);
    }
  }
  return plans;
}
async function findPlans(userId) {
  const plans = await Plan.findAll({
    where: {
      userId: userId,
    },
    raw: true,
  });
  return plans;
}
async function findColumns(planId) {
  const columns = await Column.findAll({
    where: {
      planId: planId,
    },
    raw: true,
  });
  return columns;
}
async function findCheckBoxes(columnId) {
  const checkBoxes = await CheckBox.findAll({
    where: {
      columnId: columnId,
    },
    raw: true,
  });
  return checkBoxes;
}

module.exports = { createDatabaseModels, browseAllData };
