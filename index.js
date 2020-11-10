const express = require("express");
const app = express(); // create express app
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const path = require("path");
const { connect } = require("./database");
const { createUserDatabase, createUser } = require("./models/User");
connect();
createUserDatabase();
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("This is from express.js");
});
app.post("/api/users/registrate", async (req, res) => {
  //TODO: check if there is user with same login
  console.log(req.body);
  const user = await createUser(
    req.body.name,
    req.body.surname,
    req.body.login,
    req.body.password
  );
  const answer = {
    id: user.id,
    login: user.login,
    name: user.name,
    surname: user.surname,
  };
  res.json(JSON.stringify(answer));
});
// send react client with inself rounting
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
