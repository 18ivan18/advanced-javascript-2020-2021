global.__basedir = __dirname;

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const api = require("./api");
const db = require("./db_sql");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__basedir, "static")));

api.connect(app, "/api");

app.get("/lit-html/*", function (req, res) {
  const reqPath = req.path;
  res.sendFile(path.join(__basedir, "node_modules", ...reqPath.split("/")));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__basedir, "./static/index.html"));
});

app.get("/createUser", function (req, res) {
  res.sendFile(path.join(__basedir, "./static/create-user.html"));
});

app.get("/editUser", function (req, res) {
  res.sendFile(path.join(__basedir, "./static/edit-user.html"));
});

app.get("*", function (req, res) {
  res.status(404).send("PAGE NOT FOUND!");
});

app.use(function (err, req, res, next) {
  if (err.message === "BAD_REQUEST") {
    res.status(400).send("BAD REQUEST");
    return;
  }
  res.status(500).send("SERVER ERROR");
});

db.connect().then(() => {
  app.listen(PORT, function () {
    console.log(`Server is listening on: ${PORT}`);
  });
});
