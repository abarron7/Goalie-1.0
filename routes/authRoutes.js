// PASSPORT: These are the main passport routes for handling signup, signin,logout, and to show the users dashboard
module.exports = (app, passport) => {
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

  // Load sign up page for authentication
  app.get("/signup", (req, res) => {
    let logout = false;
    if (req.user) {
      logout = true;
    }
    res.render("signup", {
      logout: logout
    });
  });

  // Sends sign up data through the passport authentication model which will redirect to the newuser or to the signup route
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/newuser",
      failureRedirect: "/signup"
    })
  );

  // Load sign in page for authentication
  app.get("/signin", (req, res) => {
    let logout = false;
    if (req.user) {
      logout = true;
    }
    res.render("signin", {
      logout: logout
    });
  });

  // Sends signin to passport the authentication method and redirects based on it's result
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/signin"
    })
  );

  // Load logout route to destroy passport session
  app.get("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.redirect("/error"); // will render a 404 since that route doesn't exist
      }
      res.redirect("/");
    });
  });

  // Load dashboard page after authentication
  app.get("/dashboard", isLoggedIn, (req, res) => {
    let logout = false;
    if (req.user) {
      logout = true;
    }
    res.render("dashboard", {
      logout: logout
    });
  });

  app.get("/newuser", isLoggedIn, (req, res) => {
    let logout = false;
    if (req.user) {
      logout = true;
    }
    res.render("newuser", {
      logout: logout
    });
  });
  // adds the data from the newuser form to financials
  app.post("/dashboard", isLoggedIn, (req, res) => {
    db.Financials.create(req.body).then(dataFromForm => {
      res.render("dashboard", {
        form: dataFromForm,
        balance: balance,
        income: income,
        goaldescr: goaldescr,
        goalamount: goalamount
      });
    });
  });

  // Passport function that checks if the user is logged in or not.  If not then it redirects them to the signin page
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
