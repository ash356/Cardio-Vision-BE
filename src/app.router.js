import connectDB from "../DB/connection.js";
import authRouter from "./Modules/Auth/auth.router.js";
import userRouter from "./Modules/User/user.router.js";
import { globalErrorHandling } from "./Utils/errorHandling.js";
import cors from "cors";
const initApp = (app, express) => {
  // Make Routes Case Sensitive ( Must Before Buffer Data)
  app.set("case sensitive routing", true);
  // console.log(
  //   "Case sensitive routing:",
  //   app.settings["case sensitive routing"]
  // );
  // Convert Buffer Data
  app.use(express.json({}));
  // To Allow Front End Request
  app.use(cors());
  // DataBase Connection
  connectDB();
  //  Home Page
  app.get("/", (req, res) => {
    return res.json({ message: "Welcome To Cardio-Vision Website" });
  });
  //    Auth Router
  app.use("/auth", authRouter);
  //    User Router
  app.use("/user", userRouter);
  // Handle Routing Errors
  app.all("*", (req, res, next) => {
    return res.json({ message: "Error 404 Page Not Found !" });
  });
  // Global Error Handling
  app.use(globalErrorHandling);
};
export default initApp;
