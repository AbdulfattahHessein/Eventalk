const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  var token = req.cookies.jwt;
  // decode token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, token_data) {
      if (err) {
        return res.status(403).send("Error");
      } else {
        req.userData = token_data;
        next();
      }
    });
  } else {
    // return res.status(403).send("No token");
    res.redirect("/user/login");
  }
};
