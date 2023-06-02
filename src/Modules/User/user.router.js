import { Router } from "express";
import * as userController from "./Controller/user.controller.js";
import * as validators from "./user.validation.js";
import { validation } from "../../MiddleWare/validation.js";
import auth from "../../MiddleWare/auth.middleware.js";
import { fileUpload, fileValidation } from "../../Utils/multer.js";
const router = Router();
// 01- Get Profile Data
router.get("/profile", auth, userController.getProfile);
// 02- Profile Picture
router.patch(
  "/profilePic",
  auth,
  fileUpload(fileValidation.image).single("image"),
  validation(validators.profilePic),
  userController.profilePic
);

// 03- Update Profile
router.put(
  "/update",
  auth,
  validation(validators.updateProfile),
  userController.updateProfile
);
// 04- Update Password
router.patch(
  "/updatePassword",
  auth,
  validation(validators.updatePassword),
  userController.updatePassword
);
// 05- Delete User
router.delete("/delete", auth, userController.deleteUser);
export default router;
