import userModel from "../../../../DB/Models/User.Model.js";
import { compare, hash } from "../../../Utils/HashAndCompare.js";
import cloudinary from "../../../Utils/cloudinary.js";
import { asyncHandler } from "../../../Utils/errorHandling.js";

// 01- Get User Profile
export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel
    .findById(req.user._id)
    .select("firstName lastName email status phone gender profilePic role");
  await res.set("Cache-Control", "no-cache");
  return res.status(200).json({ message: "Success", user });
});
// 02- Profile Picture
export const profilePic = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  // console.log(req.file);
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `${process.env.APP_NAME}/User/${req.user._id}/Profile`,
    }
  );
  // If You Need To Delete Last Image
  // await cloudinary.uploader.destroy(user.profilePic.public_id);
  user.profilePic = { secure_url, public_id };
  await user.save();
  return res.status(202).json({ message: "Success", user: user.profilePic });
});
// 03- Update Profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, gender } = req.body;
  const user = await userModel.findById(req.user._id);
  user.firstName = firstName;
  user.lastName = lastName;
  user.userName = `${firstName} ${lastName}`;
  user.phone = phone;
  user.gender = gender;
  await user.save();
  return res.status(200).json({ message: "Success", user: user._id });
});
// 04- Update Password
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await userModel.findById(req.user._id);
  // Check Old Password
  if (!compare({ plainText: oldPassword, hashedValue: user.password })) {
    return next(new Error("In-Valid Old Password !", { cause: 400 }));
  }
  // Compare Old With New
  else if (newPassword === oldPassword) {
    return next(
      new Error("Can't Be The Same As Old Password !", { cause: 400 })
    );
  }
  // Hashing Password & Update
  else {
    const hashPassword = hash({ plainText: newPassword });
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({ message: "Success", user: user._id });
  }
});
// 05- Delete User Will Delete Warring Every Thing About User
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndDelete(req.user._id);
  return res.json({ message: "Success", user: user._id });
});
