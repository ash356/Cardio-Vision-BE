import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_ATLAS)
    .then((result) => {
      console.log(`DB Connected...`);
      //   console.log(result);
    })
    .catch((error) => {
      console.log(`DB Connection Failed...`);
      //   console.log(error);
    });
};
export default connectDB;
