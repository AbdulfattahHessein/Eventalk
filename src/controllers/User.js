const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  renderSignup: async (req, res) => {
    res.render("register", { layout: false });
  },
  signup: async (req, res) => {
    const user = await db.users.create(req.body);
    res.redirect("/user/login");
  },
  renderLogin: async (req, res) => {
    res.render("login", { layout: false, error: null });
  },
  login: async (req, res) => {
    const user = await db.users.findOne({ where: { email: req.body.email } });
    if (user != null) {
      let isValid = await bcrypt.compare(req.body.password, user.password);
      if (isValid) {
        const token = jwt.sign(
          { userId: user.id, role: user.role, firstName: user.firstName },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "90d" }
        );
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 90 * 24 * 3600000),
        });
        res.redirect("/");
      }
    } else {
      res.render("login", {
        layout: false,
        error: "Email or password not valid",
      });
    }
  },
  // TODO : implement the logic for logging in a registered user and generating JWT Token  here...

  logout: (req, res) => {
    res.clearCookie("jwt");
    delete req.session.user;

    res.redirect("/");
  },
};
