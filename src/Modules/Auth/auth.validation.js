import joi from "joi";
import { generalFields } from "../../MiddleWare/validation.js";
// 01- Signup Validation
export const signup = joi
  .object({
    firstName: joi.string().min(2).max(15).required(),
    lastName: joi.string().min(2).max(15).required(),
    email: generalFields.email,
    password: generalFields.password,
    cPassword: generalFields.password.valid(joi.ref("password")).required(),
  })
  .required();
// 02- Token Validation
export const token = joi
  .object({
    token: joi.string().required(),
  })
  .required();
// 03- Login Validation
export const login = joi
  .object({
    email: generalFields.email,
    password: generalFields.password,
  })
  .required();
// 04- forgetPassword Validation
export const forgetPassword = joi
  .object({
    email: generalFields.email,
  })
  .required();
// 05- resetPassword Validation
export const resetPassword = joi
  .object({
    email: generalFields.email,
    resetCode: joi.string().min(6).max(6).required(),
    newPassword: generalFields.password,
    cPassword: generalFields.password.valid(joi.ref("newPassword")).required(),
  })
  .required();
// 05- Set Admin Validation
export const setAdmin = joi
  .object({
    email: generalFields.email,
  })
  .required();
export const deleteUser = joi
  .object({
    id: generalFields.id,
  })
  .required();
