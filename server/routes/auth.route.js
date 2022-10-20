const express = require("express")
const validate = require("../helpers/validate")
const authController = require("../controllers/auth.controller")
const authValidation = require("../policies/auth.policy")
const { authService } = require("../services")
const router = express.Router()

router.post(
    "/register", 
    [validate(authValidation.register)],
    authController.register
)

router.post(
    "/login",
    [validate(authValidation.login)],
    authController.login
)

router.post(
    "/verifyaccount",
    [validate(authValidation.confirmAccount)],
    authController.emailVerification
)

router.post(
    "/forgot/password",
    [validate(authValidation.forgotPassword)],
    authController.forgotPassword
)

router.post(
    "/reset/password",
    [validate(authValidation.resetPassword)],
    authController.resetPassword
)

router.put(
    "update/password",
    [validate(authValidation.updatePassword), authService.validateToken],
    authController.updatePassword
)

router.put(
    "update/user",
    [authService.validateToken],
    authController.updateUserById
)


router.get(
    "/account/resend",
    [authService.validateToken],
    authController.resendTokens
)

router.get(
  "/getone",
  [authService.validateToken],
  authController.getUser
);

router.get(
  "/getall",
  [authService.validateToken],
  authController.getUsers
);


module.exports = router