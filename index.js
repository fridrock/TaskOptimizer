const express = require("express");
const app = express(); // create express app
const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("This is from express.js");
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
