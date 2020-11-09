const express = require("express");
const app = express(); // create express app
const path = require("path");
const { connect } = require("./database");
const { createUsersDatabase, createUser } = require("./models/user");
connect();
createUsersDatabase();
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("This is from express.js");
});
app.get("/api/users/registration", (req, res) => {
  console.log(req.body);
  createUser("", "", "", "");
  res.json({ huesos: "huesos" });
  console.log("query received");
  //TODO: insert user in table
  //TODO: get his generated id
  //TODO: send it back to client
});
// send react client with inself rounting
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
