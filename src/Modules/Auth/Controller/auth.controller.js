import userModel from "../../../../DB/Models/User.Model.js";
import {
  createToken,
  verifyToken,
} from "../../../Utils/CreateAndVerifyToken.js";
import { compare, hash } from "../../../Utils/HashAndCompare.js";
import { asyncHandler } from "../../../Utils/errorHandling.js";
import sendEmail from "../../../Utils/nodeMailer.js";
import { customAlphabet } from "nanoid";

// 01- Signup Method
export const signup = asyncHandler(async (req, res, next) => {
  // Destructing Data From Body
  const { firstName, lastName, email, password } = req.body;
  // Check if User Exist In The System
  const checkUser = await userModel.findOne({ email });
  if (checkUser) {
    return next(new Error("Email Allready Exist !", { cause: 409 }));
  }
  // Sending Email To Confirm
  // First Token Valid For 5 Mins
  const token = createToken({
    payload: { email },
    expiresIn: 60 * 5,
    signature: process.env.EMAIL_TOKEN,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  // Second Token Valid For 30 Days To Request New Confirmation
  const refreshToken = createToken({
    payload: { email },
    expiresIn: 60 * 60 * 24 * 30,
    signature: process.env.EMAIL_TOKEN,
  });
  const refreshLink = `${req.protocol}://${req.headers.host}/auth/confirmNewEmail/${refreshToken}`;
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Welcome</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
        }
  
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 700;
          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
        }
  
        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 400;
          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
        }
  
        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 700;
          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
        }
      }
  
      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
  
      table,
      img {
        -ms-interpolation-mode: bicubic;
      }
  
      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
  
      table {
        border-collapse: collapse !important;
      }
  
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
  
      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
  
      /* MOBILE STYLES */
      @media screen and (max-width:600px) {
        h1 {
          font-size: 32px !important;
          line-height: 32px !important;
        }
      }
  
      /* ANDROID CENTER FIX */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
    </style>
  </head>
  
  <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <!-- LOGO -->
      <tr>
        <td bgcolor="#FFA73B" align="center">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td bgcolor="#ffffff" align="center" valign="top"
                style="padding: 10px 15px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img
                  src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120"
                  style="display: block; border: 0px;" />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td bgcolor="#ffffff" align="left"
                style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                <p style="margin: 0;">You're almost ready to get going, we just need to verify your email before starting.
                  Click on the button below to complete your registration and get started!
                </p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td bgcolor="#ffffff" align="center" style="padding: 10px 0px 30px 0px;">
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${link}"
                              target="_blank"
                              style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm
                              Account</a></td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr> <!-- COPY -->
            <tr>
              <td bgcolor="#ffffff" align="left"
                style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                <p style="margin: 0;">If that doesn't work, Request New Confirmation Email.</p>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffff" align="left"
                style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                <p style="margin: 0;">Best Regards,<br><br> Cardio-Vision Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 10px 10px 0px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td bgcolor="#FFECD1" align="center"
                style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Request New Confirmation Email ?
                </h2>
                <p style="margin: 0;"><a href="${refreshLink}" target="_blank" style="color: #FFA73B;">Send Email</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td bgcolor="#f4f4f4" align="left"
                style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                <br>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  
  </html>`;
  const info = await sendEmail({ to: email, subject: "Confirm Email", html });
  // console.log({ info });
  if (!info) {
    return next(new Error("Rejected Email"), { cause: 400 });
  }
  // Hashing Password
  const hashPassword = hash({ plainText: password });
  // Creating Model
  const user = await userModel.create({
    firstName,
    lastName,
    userName: `${firstName} ${lastName}`,
    email,
    password: hashPassword,
  });
  return res.status(201).json({ message: "Success", user: user._id });
});
// 02- Confirm Email Method
export const confirmEmail = asyncHandler(async (req, res, next) => {
  // Destructing Email From Token
  const { token } = req.params;
  const { email } = verifyToken({ token, signature: process.env.EMAIL_TOKEN });
  if (!email) {
    return next(new Error("In-Valid Token Payload", { cause: 400 }));
  }
  // Update User status
  const user = await userModel.updateOne({ email }, { confirmEmail: true });
  return user.modifiedCount
    ? res.status(200).redirect(`${process.env.FE_URL}/log-in`)
    : next(new Error("Not Register Account !", { cause: 400 }));
});
// 03- New Request To Confirm Email Method
export const requestNewEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { email } = verifyToken({ token, signature: process.env.EMAIL_TOKEN });
  if (!email) {
    return next(new Error("In-Valid Token Payload", { cause: 400 }));
  }
  const user = await userModel.findOne({ email });
  // If Not Registered User
  if (!user) {
    return next(new Error("Not Register Account !", { cause: 404 }));
  }
  // If Allready Confirmed
  else if (user.confirmEmail) {
    return res.status(200).redirect(`${process.env.FE_URL}/log-in`);
  }
  // Sending New Request
  else {
    const newToken = createToken({
      payload: { email },
      expiresIn: 60 * 5,
      signature: process.env.EMAIL_TOKEN,
    });
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`;
    const refreshLink = `${req.protocol}://${req.headers.host}/auth/confirmNewEmail/${token}`;
    const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Welcome</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
        @media screen {
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
          }
    
          @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
          }
    
          @font-face {
            font-family: 'Lato';
            font-style: italic;
            font-weight: 400;
            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
          }
    
          @font-face {
            font-family: 'Lato';
            font-style: italic;
            font-weight: 700;
            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
          }
        }
    
        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        img {
          -ms-interpolation-mode: bicubic;
        }
    
        /* RESET STYLES */
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
    
        table {
          border-collapse: collapse !important;
        }
    
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
    
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
    
        /* MOBILE STYLES */
        @media screen and (max-width:600px) {
          h1 {
            font-size: 32px !important;
            line-height: 32px !important;
          }
        }
    
        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
      </style>
    </head>
    
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
          <td bgcolor="#FFA73B" align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td bgcolor="#ffffff" align="center" valign="top"
                  style="padding: 10px 15px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                  <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img
                    src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120"
                    style="display: block; border: 0px;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td bgcolor="#ffffff" align="left"
                  style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                  <p style="margin: 0;">You're almost ready to get going, we just need to verify your email before starting.
                    Click on the button below to complete your registration and get started!
                  </p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" align="left">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td bgcolor="#ffffff" align="center" style="padding: 10px 0px 30px 0px;">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${link}"
                                target="_blank"
                                style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm
                                Account</a></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr> <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left"
                  style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                  <p style="margin: 0;">If that doesn't work, Request New Confirmation Email.</p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" align="left"
                  style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                  <p style="margin: 0;">Best Regards,<br><br> Cardio-Vision Team</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#f4f4f4" align="center" style="padding: 10px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td bgcolor="#FFECD1" align="center"
                  style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                  <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Request New Confirmation Email ?
                  </h2>
                  <p style="margin: 0;"><a href="${refreshLink}" target="_blank" style="color: #FFA73B;">Send Email</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td bgcolor="#f4f4f4" align="left"
                  style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                  <br>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    
    </html>`;
    if (!(await sendEmail({ to: email, subject: "Confirm Email", html }))) {
      return next(new Error("Rejected Email"), { cause: 400 });
    }
    return res.status(200).send("<h2>Success Check You Email</h2>");
  }
});
//  04- Login Method
export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  // Check User
  if (!user) {
    return next(new Error("Account Not Found !", { cause: 404 }));
  }
  // Check If Confirmed Email
  else if (!user.confirmEmail) {
    return next(new Error("Please Confirm Email First", { cause: 400 }));
  }
  // Check Password
  else {
    const match = compare({ plainText: password, hashedValue: user.password });
    if (!match) {
      return next(new Error("In-Valid Password !", { cause: 400 }));
    }
    // Valid Email & Password
    else {
      const accessToken = createToken({
        payload: {
          id: user._id,
          email: user.email,
          status: user.status,
          role: user.role,
          isLoggedIn: true,
        },
        expiresIn: 60 * 60 * 24,
      });
      const refreshToken = createToken({
        payload: {
          id: user._id,
          email: user.email,
          status: user.status,
          role: user.role,
          isLoggedIn: true,
        },
        expiresIn: 60 * 60 * 24 * 365,
      });
      user.status = "OnLine";
      await user.save();
      return res
        .status(200)
        .json({ message: "Success", accessToken, refreshToken });
    }
  }
});
// 05- forgetpassword
export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !user.confirmEmail) {
    return next(new Error("Email Not Found !", { cause: 404 }));
  } else {
    const nanoid = customAlphabet(process.env.alphabet, 6);
    const resetCode = nanoid();
    // console.log(resetCode);
    user.resetCode = resetCode;
    await user.save();
    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Code</title>
    </head>
    
    <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #FFA73B;text-decoration:none;font-weight:600">Cardio Vision</a>
          </div>
          <p style="font-size:1.1em">Hi ${user.userName}</p>
          <p>Thank you for choosing Cardio-Vision. You Request To Reset Your Password.</p>
          <h2>Here Is Your Verification Code:</h2>
          <h2
            style="background: #FFA73B;margin: 0 auto;width: max-content;padding: 10px 50px;color: #fff;border-radius: 4px;">
          ${resetCode}
            </h2>
          <p style="font-size:0.9em;">Best Regards,<br />Cardio-Vision Team</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>
    </body>
    
    </html>`;
    const info = await sendEmail({
      to: email,
      subject: "Reset Password",
      html,
    });
    // console.log({ info });
    if (!info) {
      return next(new Error("Rejected Email"), { cause: 400 });
    }
    return res.status(201).json({ message: "Success", user: user.email });
  }
});
// 06- Reset Password
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, resetCode, newPassword } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("In-Valid Email"), { cause: 400 });
  }
  if (user.resetCode != resetCode || !resetCode) {
    return next(new Error("In-Valid Code"), { cause: 400 });
  }
  // If Change Password As Old Password
  else if (compare({ plainText: newPassword, hashedValue: user.password })) {
    return next(
      new Error("Can't Reset Password Like Old Password", { cause: 400 })
    );
  }
  // Valid Email , Code , NewPassword
  else {
    const hashPassword = hash({ plainText: newPassword });
    user.password = hashPassword;
    user.resetCode = null;
    await user.save();
    return res.status(200).json({ message: "Success" });
  }
});
// 07- Logout Method
export const logout = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  // Check User
  if (!user) {
    return next(new Error("Account Not Found !", { cause: 404 }));
  }
  user.status = "OffLine";
  await user.save();
  return res.status(200).json({ message: "Success" });
});
// 08- Set Admin
export const setAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const admin = await userModel.findById(req.user._id);
  if (admin.role != "Admin") {
    return next(new Error("Not Allowed To Change Roles"), { cause: 400 });
  }
  const user = await userModel.findOne({ email });
  // Check User
  if (!user) {
    return next(new Error("Account Not Found !", { cause: 404 }));
  }
  if (user.role === "Admin") {
    return next(new Error("User Allready Admin !", { cause: 400 }));
  }
  user.role = "Admin";
  await user.save();
  return res.status(200).json({ message: "Success", user: user._id });
});
// 08- Set Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  const admin = await userModel.findById(req.user._id);
  if (admin.role != "Admin") {
    return next(new Error("Not Allowed To Show Users"), { cause: 400 });
  }
  const users = await userModel
    .find({ _id: { $ne: req.user._id } })
    .select("firstName lastName email status phone gender role confirmEmail");
  // Check User
  if (!users) {
    return next(new Error("Users Not Found !", { cause: 404 }));
  }
  return res.status(200).json({ message: "Success", users });
});
// 09- Delete User
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const admin = await userModel.findById(req.user._id);
  if (admin.role != "Admin") {
    return next(new Error("Not Allowed !"), { cause: 400 });
  }
  const user = await userModel.findByIdAndDelete(id);
  // Check User
  if (!user) {
    return next(new Error("Account Not Found !", { cause: 404 }));
  }
  return res.status(200).json({ message: "Success", user: user._id });
});
