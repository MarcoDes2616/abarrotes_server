const express = require("express");
const {
  registerNewUserEmail,
  verifyEmail,
  completeRegistration,
} = require("../controllers/system.controller");
const verifyJWT = require("../middlewares/auth.middleware");

const systemRouter = express.Router();

systemRouter.route("/register_new_user_email")
  .post(registerNewUserEmail);

systemRouter.route("/verify_email_token")
  .post(verifyEmail);

systemRouter.route("/complete_registration")
  .post(completeRegistration);

module.exports = systemRouter;
