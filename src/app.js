const express = require("express");
const path = require("path");
const app = express();
const router = require("./routes");
const session = require("express-session");
const flash = require("connect-flash");
const { sessionOpt } = require("./configs/keys");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session(sessionOpt));
app.use(flash());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(router);

module.exports = app;
