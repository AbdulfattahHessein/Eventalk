const controller = require("../controllers/User");
const router = require("express").Router();
const encryptPassword = require("../middlewares/encryptPassword");

router
  .route("/signup")
  .get(controller.renderSignup)
  .post(encryptPassword, controller.signup);

router.route("/login").get(controller.renderLogin).post(controller.login);
router.route("/logout").get(controller.logout);

module.exports = router;
