var express = require("express");
//var userModel = require.main.require("./models/user");
var router = express.Router();
var adminModel = require("../models/adminModel");
const { body, validationResult } = require("express-validator");

// '/admin' GET......................................
router.get("/", function (req, res) {
  if (req.session.username != null) {
    res.render("admin");
  } else {
    res.redirect("/login");
  }
});
// // /admin/ post
// router.post("/", function (req, res) {
//   res.redirect("/admin/AddEmployee");
// });

// '/admin/AddEmployee' get.......................................
router.get("/AddEmployee", function (req, res) {
  res.render("AddEmployee");
});
// /admin/AddEmployee POST....................................
router.post(
  "/AddEmployee",
  [
    // username must not be empty
    body("name").notEmpty().isLength({ min: 4 }),
    // Contact must not be empty
    body("contact").notEmpty().isLength({ min: 4 }),
    // User Name must not be empty
    body("username").notEmpty().isLength({ min: 4 }),
    // User Name must not be empty
    body("password").notEmpty().isLength({ min: 4 }),

    // password must be at least 8 chars long
    // body("upassword")
    //   .notEmpty()
    //   .isLength({ min: 8 })
    //   .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var user = {
      name: req.body.name,
      contact: req.body.contact,
      username: req.body.username,
      password: req.body.password,
    };
    console.log(user);
    res.redirect("/admin");
    // insert employee Info
    adminModel.insert(user, function (status) {
      if (status) {
        res.redirect("/admin");
      } else {
        res.redirect("/admin/AddEmployee");
      }
    });
  }
);

//ALl EMployee Get.................................................
router.get("/AllEmployee", function (req, res) {
  adminModel.getAll((result) => {
    console.log(result);
    //res.render("AllEmployee");
    if (result) {
      res.render("AllEmployee", { employeeList: result });
    } else {
      res.redirect("/admin");
    }
  });
});
//Delete Employee Get.................................................
router.get("/deleteEmployee/:username", function (req, res) {
  res.render("deleteEmployee", { username: req.params.username });
  console.log(req.params.username);
  // adminModel.get(req.params.username, function(result){
  // res.render('admin/deleteEmployee', {user: result});
  // console.log(result);
});
//Delete Employee post.................................................
router.post("/deleteEmployee/:username", function (req, res) {
  adminModel.delete(req.body.username, function (status) {
    if (status) {
      res.redirect("/admin/AllEmployee");
    } else {
      res.redirect("/admin");
    }
  });
});

module.exports = router;
