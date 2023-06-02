import joi from "joi";
import { generalFields } from "../../MiddleWare/validation.js";
// 01- profilePic Validation
export const profilePic = joi
  .object({
    file: generalFields.file.required(),
  })
  .required();
// 02- Update Profile Validation
export const updateProfile = joi
  .object({
    firstName: joi.string().min(2).max(15).required(),
    lastName: joi.string().min(2).max(15).required(),
    phone: joi
      .string()
      .pattern(/^\+201(0|1|2|5)[0-9]{8}$/) // Phone Validation for Only Egyption Numbers
      .required(),
    gender: joi.string().valid("Male", "Female").required(),
  })
  .required();
// 03- Update Password
export const updatePassword = joi
  .object({
    oldPassword: generalFields.password,
    newPassword: generalFields.password,
    cPassword: generalFields.password.valid(joi.ref("newPassword")).required(),
  })
  .required();
// 04- Token Validation
export const token = joi
  .object({
    token: joi.string().required(),
  })
  .required();
