const db = require("../models");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async function encryptPassword(req, res, next) {
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  req.body.password = hash;
  next();
};
