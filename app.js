const express = require("express");

var login = require("./controller/loginController");
var admin = require("./controller/adminController");
//var employee = require("./controller/employee");

var exSession = require("express-session");
var bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  exSession({
    secret: "my secret value",
    saveUninitialized: true,
    resave: false,
  })
);

app.use("/login", login);
app.use("/admin", admin);
//app.use("/employee", employee);

app.listen(3000, function () {
  console.log("express http server started at...3000");
});
