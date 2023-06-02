// // 01- AsyncHandler Instead Of Try Catch
// export const asyncHandler = (func) => {
//   return (req, res, next) => {
//     func(req, res, next).catch((error) => {
//       return res.json({ message: "Error !", error, stack: error.stack });
//       // return next(new Error("Error! "));
//     });
//   };
// };
// // 02- Global Error Handling Instead Of All Responses
// export const globalErrorHandling = (err, req, res, next) => {
//   if (err) {
//     return res.status(err.cause || 500).json({ message: err.message });
//   }
//   if (err.name === "CastError" && err.kind === "ObjectId") {
//     // handle CastError caused by invalid ObjectId
//     return res.status(400).json({ message: err.message });
//   }
// };
// New Error Handling
export const asyncHandler = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((err) => {
      return next(new Error(err, { cause: 500 }));
    });
  };
};
export const globalErrorHandling = (err, req, res, next) => {
  if (err) {
    if (process.env.MOOD == "DEV") {
      return res
        .status(err.cause || 500)
        .json({ message: err.message, err, stack: err.stack });
    } else {
      return res.status(err.cause || 500).json({ message: err.message });
    }
  }
};
