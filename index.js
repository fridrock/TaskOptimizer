const express = require("express");
const app = express(); // create express app
const bodyParser = require("body-parser");
const path = require("path");
const { createDatabaseModels, browseAllData } = require("./databaseFunctions");
const { connect } = require("./database");
const { createUser, authUser } = require("./models/User");
const { createPlan, deletePlan } = require("./models/Plan");
const { UserWithSameLogin } = require("./customErrors/UserWithSameLogin");
const { noSuchUser } = require("./customErrors/noSuchUser");
const { createColumn, deleteColumn } = require("./models/Column");
const { createCheckBox, updateCheckBox } = require("./models/CheckBox");
connect();
createDatabaseModels();

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
//creating answer object to delete some options and create child arrays
app.post("/api/users/auth", async (req, res) => {
  try {
    const user = await authUser(req.body.login, req.body.password);
    const answer = {
      userId: user.userId,
      login: user.login,
      name: user.name,
      surname: user.surname,
    };

    res.json(JSON.stringify(answer));
  } catch (err) {
    console.log(err);
    if (err instanceof noSuchUser) {
      res.status(400).json(JSON.stringify(err));
    }
  }
});

app.post("/api/users/registrate", async (req, res) => {
  try {
    const user = await createUser(
      req.body.name,
      req.body.surname,
      req.body.login,
      req.body.password
    );
    const answer = {
      userId: user.userId,
      login: user.login,
      name: user.name,
      surname: user.surname,
    };
    res.status(200).json(JSON.stringify(answer));
  } catch (err) {
    if (err instanceof UserWithSameLogin) {
      res.status(400).json(JSON.stringify(err));
    }
  }
});

app.post("/api/plans/create", async (req, res) => {
  try {
    const plan = await createPlan(req.body.userId, req.body.planName);
    const answer = {
      planId: plan.planId,
      userId: plan.userId,
      planName: plan.planName,
      columns: [],
    };

    res.json(JSON.stringify(answer));
  } catch (e) {
    console.log(e);
  }
});
app.post("/api/plans/delete", async (req, res) => {
  try {
    await deletePlan(req.body.planId);
    res.json(JSON.stringify("succesfully deleted"));
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/columns/create", async (req, res) => {
  try {
    const column = await createColumn(req.body);
    const answer = {
      planId: column.planId,
      columnName: column.columnName,
      columnId: column.columnId,
      checkBoxes: [],
    };
    res.json(JSON.stringify(answer));
  } catch (e) {
    console.log(e.message);
  }
});
app.post("/api/columns/delete", async (req, res) => {
  try {
    await deleteColumn(req.body.columnId);
    res.json(JSON.stringify("deleted column"));
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/api/checkboxes/create", async (req, res) => {
  try {
    const checkbox = await createCheckBox(req.body);
    const answer = {
      columnId: checkbox.columnId,
      checkBoxName: checkbox.checkBoxName,
      checkBoxDone: checkbox.checkBoxDone,
      checkBoxId: checkbox.checkBoxId,
    };
    res.json(JSON.stringify(answer));
  } catch (e) {
    console.log(e.message);
  }
});
app.post("/api/checkboxes/update", async (req, res) => {
  try {
    await updateCheckBox(req.body);
    res.status(200).json("checkBoxUpdated");
  } catch (e) {
    console.log(e.message);
  }
});
app.post("/api/plans/userdata", async (req, res) => {
  try {
    const plans = await browseAllData(req.body.userId);
    res.status(200).json(JSON.stringify(plans));
  } catch (e) {
    console.log(e.message);
  }
});
// send react client with itself rounting
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
