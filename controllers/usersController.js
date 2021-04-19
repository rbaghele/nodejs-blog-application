const User = require("./../database/models/User");

const newUser = (req, res) => {
  res.render("register", {
    errors: req.flash("registrationErrors"),
  });
};

const createUser = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const registrationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );

      req.flash("registrationErrors", registrationErrors);
      return res.redirect("/auth/register");
    }
    res.redirect("/");
  });
};

module.exports = {
  newUser,
  createUser,
};
