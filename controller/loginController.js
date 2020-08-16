var express = require("express");
//var userModel = require.main.require("./models/user");
var router = express.Router();
const { body, validationResult } = require("express-validator");

//get
router.get("/", function (req, res) {
  res.render("login");
});

//post
router.post(
  "/",
  [
    // username must not be empty
    body("username").notEmpty().isLength({ min: 4 }),
    // password must be at least 4 chars long
    body("password").notEmpty().isLength({ min: 4 }),
    //   .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    // body("password").notEmpty().matches("password"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      var user = {
        username: req.body.username,
        password: req.body.password,
      };
      if (user.username == "12345") {
        req.session.username = req.body.username;
        res.redirect("/admin");
      } else {
        res.redirect("/admin");
      }
    }
  }
);

module.exports = router;
