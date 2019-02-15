var db = require("../models");
var financialsData = require("../public/js/financials");

module.exports = app => {
  // Load index page
  app.get("/", (req, res) => {
    db.User.findAll({}).then(function(usersData) {
      let logout = false;
      if (req.user) {
        logout = true;
      }
      console.log(req.user);
      res.render("index", {
        msg: "Welcome!",
        // PASSPORT: logout will be true or false if user is logged in
        logout: logout,
        usersData: usersData
      });
    });
  });

  app.get("/newuser", function(req, res) {
    db.Users.findAll({}).then(function(usersData) {
      res.render("newuser", {
        usersData: usersData
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    console.log("~~Running get user request~~");
    // if (req.params.id != "POST") {
    console.log("~~Running get user request~~");
    financialsData(req.params.id, function(userDetails) {
      res.render("financials", userDetails);
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
