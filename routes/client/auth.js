const express =  require("express");
const routes  =  express.Router();
const authController =  require("../../controller/client/authController")
routes.route("/register").post(authController.register);
routes.post("/login",authController.login);
routes.route("/forgot-password").post(authController.forgotPassword);
routes.route("/validate-otp").post(authController.validateResetPasswordOtp);
routes.route("/reset-password").put(authController.resetPassword);

module.exports = routes;