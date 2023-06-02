import { Router } from "express";
import * as authController from "./Controller/auth.controller.js";
import * as validators from "./auth.validation.js";
import { validation } from "../../MiddleWare/validation.js";
import auth from "../../MiddleWare/auth.middleware.js";

const router = Router();

// 01- Signup Post Method
router.post("/sign-up", validation(validators.signup), authController.signup);
// 02- Confirm Email Get Method
router.get(
  "/confirmEmail/:token",
  validation(validators.token),
  authController.confirmEmail
);
// 03- Request New Confirm Email
router.get(
  "/confirmNewEmail/:token",
  validation(validators.token),
  authController.requestNewEmail
);
// 04- Login Post Method
router.post("/log-in", validation(validators.login), authController.logIn);
// 05- Forget Password
router.patch(
  "/forgetPassword",
  validation(validators.forgetPassword),
  authController.forgetPassword
);
// 06- Reset Password
router.patch(
  "/resetPassword",
  validation(validators.resetPassword),
  authController.resetPassword
);
// 07- LogOut
router.get("/log-out", auth, authController.logout);
// 08- Set Admin
router.put(
  "/setAdmin",
  auth,
  validation(validators.setAdmin),
  authController.setAdmin
);
// 09- Get Users
router.get("/getUsers", auth, authController.getUsers);
// 10- Delete User
router.delete(
  "/deleteUser",
  auth,
  validation(validators.deleteUser),
  authController.deleteUser
);
export default router;
