var db = require("./db");

module.exports = {
  get: function (user, callback) {
    var sql = "select * from employee where username=?";
    db.getResults(sql, [user.username], function (result) {
      if (result.length > 0) {
        //console.log(result);
        callback(result[0]);
      } else {
        callback([]);
      }
    });
  },

  getType: function (user, callback) {
    var sql = "select * from admin where username=? and password=?";
    db.getResults(sql, [user.uname, user.password], function (result) {
      if (result.length > 0) {
        console.log(result);
        callback(result[0]);
      } else {
        callback([]);
      }
    });
  },

  getAll: function (callback) {
    var sql = "SELECT * FROM `employee`";
    db.getResults(sql, null, function (result) {
      if (result.length > 0) {
        callback(result);
      } else {
        callback([]);
      }
    });
  },

  validate: function (user, callback) {
    var sql = "select * from admin where username=? and password=?";
    db.getResults(sql, [user.uname, user.password], function (result) {
      if (result.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },

  insert: function (user, callback) {
    var sql =
      "INSERT INTO `employee`(`name`, `contact`, `username`, `password`) VALUES (?,?,?,?)";

    db.execute(
      sql,
      [user.name, user.contact, user.username, user.password],
      function (status) {
        if (status) {
          callback(true);
        } else {
          callback(false);
        }
      }
    );
  },

  update: function (user, callback) {
    console.log("From adminModel..........", user);
    var sql =
      "update 'employee' set 'name'=" +
      user.name +
      ", 'contact'=" +
      user.contact +
      ", 'password'=" +
      user.password +
      " where 'username'=" +
      user.username +
      "";
    db.execute(
      sql /*
      [user.name, user.contact, user.password, user.username],*/,
      function (status) {
        if (status) {
          callback(true);
        } else {
          callback(false);
        }
      }
    );
  },

  delete: function (id, callback) {
    var sql = "delete from employee where username=?";
    db.execute(sql, [id], function (status) {
      if (status) {
        callback(true);
      } else {
        callback(false);
      }
    });
  },
};
