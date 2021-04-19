const bcrypt = require("bcrypt");
const User = require("../database/models/User");

const newLogin = (req, res) => {
  res.render("login");
};

const createSession = (req, res) => {
  const { email, password } = req.body;
  // try to find the user
  User.findOne(
    {
      email,
    },
    (error, user) => {
      if (user) {
        // compare passwords.
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            req.session.userId = user._id;
            res.redirect("/");
          } else {
            res.redirect("/auth/login");
          }
        });
      } else {
        return res.redirect("/auth/login");
      }
    }
  );
};

const destorySession = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  newLogin,
  createSession,
  destorySession,
};
