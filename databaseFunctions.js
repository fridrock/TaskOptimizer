const { createUserDatabase } = require("./models/user");
const { createPlanDatabase } = require("./models/plan");
const { createColumnDatabase } = require("./models/Column");
const { createCheckBoxDatabase } = require("./models/CheckBox");
async function createDatabaseModels() {
  createUserDatabase();
  createPlanDatabase();
  createColumnDatabase();
  createCheckBoxDatabase();
}

module.exports = { createDatabaseModels };
