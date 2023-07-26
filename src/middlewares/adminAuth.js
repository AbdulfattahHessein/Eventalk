const jwt = require("jsonwebtoken");
const db = require("../models");
module.exports = async ( req, res, next ) => {
  
  if (res.locals.user.role == "admin") return next();

  res.send("You are not admin");
};
